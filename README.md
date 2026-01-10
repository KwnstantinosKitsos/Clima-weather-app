# Clima Weather App

A responsive weather application that provides real-time weather data based on user location or city search.  
I built this project to practice working with external APIs, asynchronous JavaScript, and clean UI state management.

## Live Demo
*(https://kwnstantinoskitsos.github.io/Clima-weather-app/)*

---

## Features

- **Search by City**  
  Search for current weather conditions by entering a city name.

- **Geolocation Support**  
  Automatically fetches weather data based on the user’s current location.

- **Real-Time Weather Data**  
  Displays temperature, weather condition, humidity, and wind speed using live API data.

- **Dynamic Weather Icons**  
  Maps API weather conditions to custom icons for better visual feedback.

- **Dark Mode**  
  Toggle between light and dark themes, with user preference saved in LocalStorage.

- **Persistent Theme State**  
  The selected theme remains active even after a page refresh.

- **Responsive Design**  
  Mobile-first layout built with Flexbox and CSS Grid for all screen sizes.

---

## The Logic

- **API Flow**  
  The app resolves geographic coordinates (via Geocoding when searching by city), then fetches weather data using those coordinates.

- **Async / Await Handling**  
  All API calls are managed using async/await for better readability and error handling.

- **State Management**  
  The UI updates dynamically based on API responses without page reloads.

- **Data Mapping**  
  Weather condition codes from the API are mapped to human-readable descriptions and icons.

- **LocalStorage Usage**  
  User preferences (dark/light mode) are stored locally to improve user experience.

---

## Project Structure

- **index.html**  
  Base HTML structure of the application.

- **styles.css**  
  Handles layout, responsive design, and theming (light/dark mode).

- **script.js**  
  Core logic: API calls, event handling, DOM updates, and state management.
  
- **assets/**  
  Icons and images used for weather conditions and UI elements.

---

## Tech Stack

- HTML5  
- CSS3 (Flexbox, Grid)  
- JavaScript (ES6+)  
- Weather API  
- Geolocation API  
- LocalStorage  

---

## Setup

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/clima-weather-app.git

# Navigate to the project folder
cd clima-weather-app

# Open index.html or use Live Server
