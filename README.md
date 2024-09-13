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
