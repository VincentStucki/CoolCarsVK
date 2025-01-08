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
6. [Reflexion und Notengebung](#6-reflexion-und-notengebung)  
   - [6.1 Fazit und Ausblick](#61-fazit-und-ausblick)  

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

#### AE1: Eigenschaften von Funktionen und Unterschiede zu Prozeduren  - Immutability vs. referenzierte Objekte - Vergleich von OO, prozedural und funktional.
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

#### BE1: Alles ist deklarativ  und funktional
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

#### CE2: Funktionen als Objekte und Argumente  
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


#### CE4: Map, Filter und Reduce  
Für die Anzahl der gesamten Cars wurde `reduce` genutzt.
>
Mit diesem Code sehen wir unten rechts von der Liste die Anzahl aller vorhandenen Cars:
```javascript
<div className="total-cars">
   Total Cars: {orgCars.reduce((total) => total + 1, 0)}
</div>
```
---

### 3.4 Refactoring und Code-Optimierung  

#### DE1: Refactoring-Techniken  
Zur Verbesserung der Lesbarkeit wurden lange Funktionen in kleinere, verständlichere Teilfunktionen zerlegt.  
Wir haben einen ziemlich langen `UseEffect`. Der beinhaltet 5 kleine Teilfunktionen. 
```javascript
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
```
Nach einer Oprimierung und Zerteilung der UseEffect-Funktionen in einzelne Funktionen, mithilfe von `function() {}` könnte der Code so aussehen (im Projekt unverändert!):

```javascript
// Sortieren der Autos
function sortCars(cars, sortOrder) {
    if (sortOrder === "asc") {
        return cars.sort((a, b) => a.brand.localeCompare(b.brand)); // Aufsteigend
    } else if (sortOrder === "desc") {
        return cars.sort((a, b) => b.brand.localeCompare(a.brand)); // Absteigend
    }
    return cars;
}

// Nur Marken anzeigen
function filterBrandOnly(cars, isName) {
    if (isName) {
        return cars.map((car) => ({
            ...car,
            model: "",
            horsePower: "",
        }));
    }
    return cars;
}

// Suche nach Autos
function searchCars(cars, searchTerm) {
    if (searchTerm) {
        return cars.filter((car) =>
            car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.horsePower.toString().includes(searchTerm)
        );
    }
    return cars;
}

// Filter nach PS
function filterByHorsePower(cars, filter) {
    if (filter === "ps") {
        const maxHorsePower = Math.max(...cars.map((car) => car.horsePower)); // Maximaler PS-Wert
        return cars.filter((car) => car.horsePower === maxHorsePower); // Nur das Auto mit max PS
    }
    return cars;
}

// Pagination anwenden
function paginateCars(cars, currentPage, carsPerPage) {
    const indexOfFirstCar = (currentPage - 1) * carsPerPage;
    return cars.slice(indexOfFirstCar, indexOfFirstCar + carsPerPage);
}
```

#### DE2: Performance-Optimierung  
Effiziente Algorithmen wie Lazy Evaluation wurden implementiert, um die Verarbeitung großer Datenmengen zu optimieren.  
>
Wir setzten dies nicht um, da wir gar keine Datenverarbeitung haben (wir rechnen nicht, wir rufen nur ab!).
>
Eine Möglichkeit um die Daten effizienter zu laden/verarbeiten wäre es Lazy Evaluation zu nutzen. 
>
Dafür würden wir ein Beispiel mit einem Zahlen Array machen. Wir iterieren es.
Der Code würde so aussehen:
```javascript
function lazyMap(iterable, transform) {
  // Ein Generator wird definiert
  function* mapper() {
    for (const item of iterable) {  // Gehe durch jedes Element des iterables
      yield transform(item);       // Transformiere das Element und gib es zurück
    }
  }
  return mapper();  // Gib den Generator zurück
}

// Nutzung als Beispiel
const numbers = lazyRange(100); // Generator
const doubledNumbers = lazyMap(numbers, (x) => x * 2);

for (let value of doubledNumbers) {
  console.log(value); // Nur bei Bedarf wird gerechnet
  if (value > 20) break; // Abbruchkriterium
}
```
Wir könnten `map`, `filter` oder weitere Funktionen wählen, um Daten **nur bei Bedarf** zu nutzen. .

---

## 4. Technischer Aufbau und Implementierung  
Wir verwendetn NextJS als FE und als BE Java und als DB ein provisorisches Mockup. 
>
Unsere Projektstruktur sieht folgend aus: 
```css
m450-cool-cars-be/
├── .mvn/
│   └── wrapper/
│       ├── maven-wrapper.jar
│       └── maven-wrapper.properties
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── ch/bbw/coolcarsbackend/
│   │   │       ├── Car.java
│   │   │       ├── CarController.java
│   │   │       ├── CarRepository.java
│   │   │       └── CoolCarsBackendApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── data.sql
│   │       └── schema.sql
│   └── test/
│       └── java/ch/bbw/coolcarsbackend/
│           └── CoolCarsBackendApplicationTests.java
├── .gitignore
├── mvnw
├── mvnw.cmd
└── pom.xml

m450-cool-cars-fe/
├── public/
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── app/
│   │   ├── carform/
│   │   │   └── page.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── page.module.css
│   │   └── style.css
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
└── package.json
```

---

## 5. Herausforderungen und Lösungen  

Als grösste Herausforderung haben wir das Paging gesehen, da wir nicht wussten wie wir die Daten laden sollten
und die Autos einer Seite automatisch zuordnen können. 
>
Wir haben uns überlegt, jedem Auto ein Index zu geben, mithilfe von `indexOfFirstCar`, und so eine Funktion geschrieben, welche die Autos immer um 5 Autos dazurechnet,
damit das Programm automatisch pagen kann. Eine wichtige Komponente war es das Array mit `slice` zu reduzieren und 5 Autos zu laden.
>
Der Code hierfür ist:
```javascript
const [carsPerPage] = useState(5); // Einträge pro Seite
...
const indexOfFirstCar = (currentPage - 1) * carsPerPage;
const paginatedCars = updatedCars.slice(indexOfFirstCar, indexOfFirstCar + carsPerPage);

setCars(paginatedCars);
```
Folglich mussten wir noch die gesamten Pages zusammenrechenen, wofür wir die Funktion `Math.ceil()` nutzten, jedoch davor nicht kannten. 
```javascript
const totalPages = Math.ceil(orgCars.length / carsPerPage);
```

---

## 6. Reflexion und Notengebung
Mit den oben aufgeführten Kompetenzmatrix-Nachweisen schäätzen wir uns selber ein:

**Note: 6**
>
-> Wir visierten immer Erweiterte Kompetenzstufen an und zeigen unsere Umsetzungen und Erkenntnisse erfolgreich auf.
>
Wir finden beide, wir haben toll gearbeitet, denn wir haben immer konzentiert und gut im Team gearbeitet. 
#### Unsere Erkenntnisse aus dem Projekt
Wir haben gelernt, dass funktionales Programmieren den Fokus auf "Was soll passieren?" legt, statt sich mit dem "Wie" zu beschäftigen. Wichtige Prinzipien wie Unveränderlichkeit, pure Funktionen, und der deklarative Code-Stil machen unseren Code vorhersehbarer, lesbarer und besser wartbar. Besonders hilfreich ist die Wiederverwendbarkeit von Komponenten und Funktionen, da sie unsere Arbeit strukturierter und effizienter macht.
>
In unserer Arbeit haben wir festgestellt, dass funktionales Programmieren durch seinen deklarativen Ansatz eine klarere und wartbarere Codebasis ermöglicht. Hier sind die zentralen Punkte:

- **Unveränderlichkeit**: Daten werden nicht direkt verändert, sondern in neuen Kopien erstellt, was Fehlerquellen reduziert.
- **Pure Funktionen**: Funktionen sind vorhersagbar und verursachen keine Seiteneffekte, was Debugging und Testbarkeit erleichtert.
- **Deklarativer Code-Stil**: Der Fokus liegt auf dem *"Was soll passieren?"*, statt dem *"Wie wird es gemacht?"*.
- **Wiederverwendbarkeit**: Kleine, unabhängige Funktionen und Komponenten können leicht kombiniert und mehrfach genutzt werden.
- **Hohe Lesbarkeit**: Der Code wird durch funktionale Ansätze übersichtlicher und leichter verständlich.

---
### 6.1 Fazit und Ausblick  

#### Ausblick auf mögliche Weiterentwicklungen
Für die Zukunft könnten wir die Tool-Unterstützung und Performance weiter optimieren, z. B. durch bessere Linters oder optimierte Datenstrukturen. Außerdem können wir funktionale Ansätze in andere Frameworks oder Projekte einbringen und so hybride Paradigmen nutzen. Funktionales Programmieren wird uns weiterhin helfen, robusten und sauberen Code zu schreiben – gerade in komplexeren Anwendungen.
>
Funktionales Programmieren hat großes Potenzial für zukünftige Entwicklungen. Wir sehen die folgenden Ansätze als besonders vielversprechend:

1. **Tool-Unterstützung**: Fortschritte in Linters und IDEs könnten uns helfen, funktionale Paradigmen noch effizienter anzuwenden.
2. **Hybride Ansätze**: Die Integration von funktionalen Konzepten in andere Paradigmen, wie objektorientiertes Programmieren, kann zu flexibleren Lösungen führen.
3. **Performance-Optimierung**: Verbesserungen in der Speicher- und Datenstrukturverwaltung könnten die Effizienz funktionaler Programme steigern.
4. **Breitere Nutzung**: Funktionale Programmierung kann verstärkt in Bereichen wie künstlicher Intelligenz oder Datenverarbeitung eingesetzt werden.
5. **Community-Wissen**: Durch wachsende Communitys und Austausch könnten neue Best Practices entstehen, die uns bei der Anwendung funktionaler Ansätze unterstützen.

#### Fazit
Funktionales Programmieren hilft uns, robuste, saubere und wartbare Anwendungen zu entwickeln. Mit den richtigen Tools und einer weiteren Verbreitung wird dieses Paradigma auch in komplexeren Projekten immer zentraler werden. Es ist ein entscheidender Schritt, um die Softwareentwicklung effizienter und nachhaltiger zu gestalten.
