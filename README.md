## Introduction
This project is a **route management application** that allows users to create, update, and delete routes and waypoints. The project uses **React**, **Mapbox GL** for maps, and **MongoDB** as the database. It provides a frontend for managing routes and waypoints with map visualization and API endpoints for data manipulation.

### Features:
- Create routes with waypoints
- Add, update, and delete waypoints
- Visualize routes and waypoints on a map
- Store data in MongoDB

## Technologies Used
- **Frontend:**
  - React
  - React Query 
  - Material UI
  - Mapbox GL
  
- **Backend:**
  - Node.js 
  - MongoDB

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js and npm
- MongoDB
- A Mapbox access token (you can sign up at [Mapbox](https://www.mapbox.com/))

### Installation
1. Clone the repository:
   git clone https://github.com/MohamedEllouze/d-ice-porject.git
2. Install the dependencies:
    - cd front-end
    - npm install
    - cd ..
    - cd back-end
    - npm install
3. Start the project :
    - npm run start
  
### Project Structure
```
/src
  /components
    - Map.tsx
    - RoutesList.tsx
    - RoutePage.tsx
  /hooks
    - route.query.ts
    - waypoint.query.ts
  /services

    - route.api.ts
    - waypoint.api.ts
  /interfaces
    - route.interface.ts
    - waypoint.interface.ts
  App.tsx

## It's your time to Explore 🚀

### 1. Viewing the Map 🗺️
- Upon launching the application, a Mapbox map will load and center on default coordinates.
- Use the map controls to zoom in and out, and interact with the map.

### 2. Adding a Route ➕
- Navigate to the routes page (`/`).
- Add a new route by clicking on the **Add New Route** button.
- Fill in the route details, including waypoints with latitude and longitude values.
- The waypoints will appear as markers on the map.

### 3. Updating a Route ✍️
- On the route list page, click the **Edit (pen icon)** button you'll be redirected to the route page.
- On the route page, click the **Edit (pen icon)** button next to each waypoint after the changements to modify its latitude or longitude.
- The map markers should update automatically based on the new values.

### 4. Drag and Drop Waypoints 🖱️
- Grab and drag any map marker to adjust its location.
- As you move a marker, the corresponding latitude and longitude fields will automatically update in the input fields.

### 5. Deleting a Waypoint 🗑️
- To remove a waypoint, click the **Delete** button next to the relevant waypoint in the table.
- The marker will be removed from the map, and the route will adjust accordingly.

### 6. Deleting a Route 🗑️
- To remove a route, click the **Delete** button next to the relevant route in the table.
