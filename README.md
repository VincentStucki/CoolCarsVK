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

```
Daten in **Cool-Cars** sind immutable, wodurch Seiteneffekte vermieden und parallele Prozesse vereinfacht wurden.
zu sehen in:
```java

```
---

### 3.2 Anforderungen und Design  

#### B1: Alles ist deklarativ  und funktional
Code-Beispiel davor:
```javascript

```
Code dannach:
```java

```
---

### 3.3 Umsetzung der funktionalen Programmierung  

#### C2F/C2E: Funktionen als Objekte und Argumente  
Die Funktion `applyDiscount` akzeptiert eine andere Funktion zur Berechnung des Rabatts, wodurch eine hohe Flexibilität im Programm ermöglicht wird.  

#### C4F/C4E: Map, Filter und Reduce  
Für die Datenverarbeitung wurde `reduce` genutzt, um die Gesamtzahl der Autos zu ermitteln.  

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
