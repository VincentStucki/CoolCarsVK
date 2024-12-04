"use client";

import style from './style.css'
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
    const [orgCars, setOrgCars] = useState([]);
    const [cars, setCars] = useState([]);
    const [sortOrder, setSortOrder] = useState("");
    const [isName, setIsName] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Aktuelle Seite
    const [carsPerPage] = useState(5); // Einträge pro Seite

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
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="App">
            <h1>My Frontend - The very beginning</h1>

            <div>
                <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                /> <br />
                Filter: <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="">Show All</option>
                <option value="ps">Show max PS</option>
            </select> <br />
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
                <br />
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
                <br />
            </div>

            <label>
                <input
                    type="checkbox"
                    checked={isName}
                    onChange={(e) => setIsName(e.target.checked)}
                />
                Only show brand
            </label>
            <br />
            <br />

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
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>


            <br />
            <Link href="/carform">Add a new car</Link>
        </div>
    );
}
