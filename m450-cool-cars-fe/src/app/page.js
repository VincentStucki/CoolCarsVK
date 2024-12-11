"use client";

import style from './style.css'
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    const [orgCars, setOrgCars] = useState([]);
    const [cars, setCars] = useState([]);
    const [sortOrder, setSortOrder] = useState("");
    const [isName, setIsName] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Aktuelle Seite
    const [carsPerPage] = useState(5); // Einträge pro Seite
    const [showFilters, setShowFilters] = useState(false); // Zustand für das Anzeigen der Filter
    const [randomCar, setRandomCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shufflingCar, setShufflingCar] = useState(null);
    const [isShuffling, setIsShuffling] = useState(false);

    function buttonHandler() {
        fetch("http://localhost:8080/cars")
            .then((response) => response.json())
            .then((data) => {
                setOrgCars(data);
                setCars(data);
            });
    }

    useEffect(() => {
        buttonHandler();
    }, []);

    useEffect(() => {
        let updatedCars = [...orgCars];

        // Sortieren
        if (sortOrder === "asc") {
            updatedCars.sort((a, b) => a.brand.localeCompare(b.brand)); // Aufsteigend
        } else if (sortOrder === "desc") {
            updatedCars.sort((a, b) => b.brand.localeCompare(a.brand)); // Absteigend
        }

        // Nur Marken anzeigen
        if (isName) {
            updatedCars = updatedCars.map((car) => ({
                ...car,
                model: "",
                horsePower: "",
            }));
        }

        if (searchTerm) {
            updatedCars = updatedCars.filter((car) =>
                car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.horsePower.toString().includes(searchTerm)
            );
        }

        if (filter === "ps") {
            const maxHorsePower = Math.max(...updatedCars.map((car) => car.horsePower)); // Maximaler PS-Wert
            updatedCars = updatedCars.filter((car) => car.horsePower === maxHorsePower); // Nur das Auto mit max PS
        }


        const indexOfFirstCar = (currentPage - 1) * carsPerPage;
        const paginatedCars = updatedCars.slice(indexOfFirstCar, indexOfFirstCar + carsPerPage);

        setCars(paginatedCars);
    }, [sortOrder, isName, orgCars, searchTerm, filter, currentPage]);

    const handleSortOrderChange = (value) => {
        setSortOrder((prevOrder) => (prevOrder === value ? "" : value));
    };

    // Berechne die Gesamtzahl der Seiten
    const totalPages = Math.ceil(orgCars.length / carsPerPage);

    // Seitenwechsel
    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) => {
            const nextPage = prevPage + direction;
            return nextPage >= 1 && nextPage <= totalPages ? nextPage : prevPage;
        });
    };

    const handlePickRandom = () => {
        setIsShuffling(true);

        let shuffleCount = 0;
        const shuffleInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * orgCars.length);
            setShufflingCar(orgCars[randomIndex]);
            shuffleCount++;

            if (shuffleCount > 17) { // Nach 10 Wiederholungen aufhören
                clearInterval(shuffleInterval);
                const finalRandomIndex = Math.floor(Math.random() * orgCars.length);
                setRandomCar(orgCars[finalRandomIndex]);
                setIsShuffling(false);
                setIsModalOpen(true);
            }
        }, 50); // Aktualisierung alle 100ms
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCopyToClipboard = () => {
        if (randomCar) {
            const carData = `${randomCar.brand} ${randomCar.model} (${randomCar.horsePower} HP)`;
            navigator.clipboard.writeText(carData).then(() => {
                alert("Car data copied to clipboard!");
            });
        }
    }

    return (
        <div className="App">
            <h1>Cool Cars VK</h1>

            <div className="filter">
                <div className="filter-left">
                    <input
                        type="text"
                        placeholder="Search cars..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="">Show All</option>
                        <option value="ps">Show max PS</option>
                    </select>
                </div>

                <div className="filter-right">
                    <button onClick={() => setShowFilters(!showFilters)} className="filter-toggle-button">
                        {showFilters ? "−" : "+"} Filters
                    </button>

                    {showFilters && (
                        <>
                            <label>
                                <input
                                    type="checkbox"
                                    name="sortOrder"
                                    value="asc"
                                    checked={sortOrder === "asc"}
                                    onChange={() => handleSortOrderChange("asc")}
                                />
                                Sort by brand (ascending)
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="sortOrder"
                                    value="desc"
                                    checked={sortOrder === "desc"}
                                    onChange={() => handleSortOrderChange("desc")}
                                />
                                Sort by brand (descending)
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isName}
                                    onChange={(e) => setIsName(e.target.checked)}
                                />
                                Only show brand
                            </label>
                        </>
                    )}
                </div>
            </div>

            <ul>
                {cars.map((car, index) => (
                    <div key={index} className="car-box">
                        <li>
                            {car.brand + (car.model ? ` ${car.model}` : "") + (car.horsePower ? ` (${car.horsePower})` : "")}
                        </li>
                    </div>
                ))}
            </ul>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(-1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <button className="button-85" role="button" onClick={handlePickRandom}>Pick Random</button>



            </div>
            <div className="total-cars">
                Total Cars: {orgCars.reduce((total) => total + 1, 0)}
            </div>

            {/* Shuffle-Anzeige */}
            {isShuffling && (
                <div className="modal-overlay">
                    <div className="modal-content">
                    <p>Shuffling...</p>
                    <h3>{shufflingCar?.brand} {shufflingCar?.model}</h3>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>{randomCar?.brand} {randomCar?.model} ({randomCar?.horsePower} HP)</h3>
                        <button onClick={handleCloseModal} className="close-button">Close</button>
                        <button onClick={handleCopyToClipboard} className="copy-button">
                           <span><FontAwesomeIcon icon={faClipboard} style={{ fontSize: '25px' }} /></span>
                    </button>
                    </div>
                </div>
            )}
            <br />
            <br />
            <Link href="/carform">Add a new car</Link>
        </div>
    );
}
