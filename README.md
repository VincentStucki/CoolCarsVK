# Projektdokumentation: **Cool-Cars**  
**Modul**: 323 – Entwicklung eines funktionalen Programmiersystems  
**Autoren**: Kenz Abdelkebir, Vincent Stucki  
**Klasse**: 5IM22a  
**Projektzeitraum**: _27.11.2024 - 08.01.2024_

---

## Inhaltsverzeichnis  

1. [Einleitung](#1-einleitung)  
2. [Projektbeschreibung](#2-projektbeschreibung)  
   - [2.1 Zielsetzung](#21-zielsetzung)  
   - [2.2 Projektumfang](#22-projektumfang)  
3. [Kompetenzmatrix und Nachweis](#3-kompetenzmatrix-und-nachweis)  
   - [3.1 Unterschiede zwischen funktionaler Programmierung und anderen Paradigmen](#31-unterschiede-zwischen-funktionaler-programmierung-und-anderen-paradigmen)  
   - [3.2 Anforderungen und Design](#32-anforderungen-und-design)  
   - [3.3 Umsetzung der funktionalen Programmierung](#33-umsetzung-der-funktionalen-programmierung)  
   - [3.4 Refactoring und Code-Optimierung](#34-refactoring-und-code-optimierung)  
4. [Technischer Aufbau und Implementierung](#4-technischer-aufbau-und-implementierung)  
5. [Herausforderungen und Lösungen](#5-herausforderungen-und-lösungen)  
6. [Fazit und Ausblick](#6-fazit-und-ausblick)  
7. [Reflexion](#7-reflexion)  

---

## 1. Einleitung  

**Cool-Cars** ist ein Projekt zur Demonstration funktionaler Programmierung im Vergleich zu anderen Programmierparadigmen. Ziel ist es, die Anwendung funktionaler Konzepte, wie Immutability, Higher-Order Functions und deklaratives Design, zu zeigen und deren Vorteile gegenüber anderen Ansätzen zu erläutern.

---

## 2. Projektbeschreibung  

### 2.1 Zielsetzung  
Das Projekt soll die Kompetenzen in der funktionalen Programmierung vertiefen und einen Vergleich mit objektorientierter und prozeduraler Programmierung ziehen.

### 2.2 Projektumfang  
Das Projekt umfasst:  
- Implementierung einer Car-Filtersystem mithilfe von Java (Backend) und Javascript (Frontend)
- Anwendung deklarativer und funktionaler Designprinzipien  
- Refactoring und Performance-Optimierung  



---

## 3. Kompetenzmatrix und Nachweis  

### 3.1 Unterschiede zwischen funktionaler Programmierung und anderen Paradigmen  

#### A1: Eigenschaften von Funktionen und Unterschiede zu Prozeduren  - Immutability vs. referenzierte Objekte - Vergleich von OO, prozedural und funktional.
Wir haben reine Funktionen ohne Seiteneffekte erstellt und deren Vorteile, wie leichtere Testbarkeit und bessere Lesbarkeit, demonstriert.  
Code-Beispiel:
```javascript
// Seitenwechsel
const handlePageChange = (pageNumber) => {
   if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
   }
};
```
Daten in **Cool-Cars** sind immutable, wodurch Seiteneffekte vermieden und parallele Prozesse vereinfacht wurden. Wir haben orgCars als ein Use State verwenden,
um den Datensatz nie zu ändern. (Darunter alle Funktionen) 
zu sehen in:
```java
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

function buttonHandler() {
   fetch("http://localhost:8080/cars")
      .then((response) => response.json())
      .then((data) => {
         setOrgCars(data);
         setCars(data);
      });
    }

useEffect(() => {
   let updatedCars = [...orgCars];
         ...
         ...
```
---

### 3.2 Anforderungen und Design  

#### B1: Alles ist deklarativ  und funktional
Code-Beispiel davor:
```javascript
function createCarList(cars) {
    const container = document.createElement("div");
    const list = document.createElement("ul");

    cars.forEach(car => {
        const item = document.createElement("li");
        item.textContent = `${car.brand} ${car.model} (${car.horsePower} PS)`;
        list.appendChild(item);
    });

    container.appendChild(list);
    return container;
}

// Die Komponente in die Seite einfügen
document.body.appendChild(createCarList(exampleCars));

```
Unser implemeniterter Code dannach:
```javascript
"use client";

import React from "react";

const CarList = ({ cars }) => {
    return (
        <div>
            <ul>
                {cars.map((car, index) => (
                    <li key={index}>
                        {car.brand} {car.model} ({car.horsePower} PS)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function App() {
    return <CarList cars={exampleCars} />;
}

```

---

### 3.3 Umsetzung der funktionalen Programmierung  

#### C2: Funktionen als Objekte und Argumente  
Die Funktion `handleSortOrderChange` haben wir als Variable defeniert und folglich komplex in einem ButtonHandler Verwendet, um wiederrum die Funktion `showFilters` zu benutzen. 
```javascript
const handleSortOrderChange = (value) => {
   setSortOrder((prevOrder) => (prevOrder === value ? "" : value));
};
 ...
{showFilters && (
 ...
)
```


#### C4: Map, Filter und Reduce  
Für die anzahl der gesamten Cars wurde `reduce` genutzt.


---

### 3.4 Refactoring und Code-Optimierung  

#### DG1/DF1/DE1: Refactoring-Techniken  
Zur Verbesserung der Lesbarkeit wurden lange Funktionen in kleinere, verständlichere Teilfunktionen zerlegt.  

#### DG2/DF2/DE2: Performance-Optimierung  
Effiziente Algorithmen wie Lazy Evaluation wurden implementiert, um die Verarbeitung großer Datenmengen zu optimieren.  

---

## 4. Technischer Aufbau und Implementierung  

Beschreibung des Tech-Stacks (z.B. Python, Flask, Datenbanken, usw.) und des Aufbaus des Systems mit Code-Beispielen.

---

## 5. Herausforderungen und Lösungen  

Hier werden die größten Schwierigkeiten dokumentiert und wie diese überwunden wurden.

---

## 6. Fazit und Ausblick  

Zusammenfassung der wichtigsten Erkenntnisse sowie Ausblick auf mögliche Weiterentwicklungen.

---

## 7. Reflexion  

Ich finde wir haben toll gearbeitet!
