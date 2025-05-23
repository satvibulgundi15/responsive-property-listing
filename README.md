# responsive-property-listing
Project Title: Listing Project (FastAPI Backend & Static Frontend)
Overview
This project is a web application for property listings, featuring a FastAPI backend for managing and serving property data, and a static frontend for displaying and filtering these listings. The backend provides filtering capabilities based on location, property type, and price range.

Project Structure
The project is organised into backend and frontend directories, along with a virtual environment for dependency management.
listing-project/
├── backend/
│   ├── __pycache__/   (Python cache files)
│   ├── images/        (Folder for property images)
│   ├── main.py        (FastAPI application entry point)
│   └── properties.json (JSON file serving listing details)
├── frontend/
│   ├── index.html     (Main HTML file for the frontend)
│   ├── scripts.js     (JavaScript for frontend logic and API interaction)
│   └── style.css      (CSS for styling, including media queries)
├── venv/              (Python virtual environment)
└── README.md


Dependencies
Backend Dependencies
The backend application, built with Python, relies on the following packages:
FastAPI: A modern, high-performance web framework for building APIs.
Uvicorn: An ASGI server to run the FastAPI application.
Frontend Dependencies
The frontend uses standard web technologies and leverages:
Bootstrap: Utilised for its responsive grid system, making the layout adaptable to various screen sizes.
Custom CSS (style.css): Includes additional media queries for fine-grained responsiveness and specific styling.
JavaScript (scripts.js): Handles the dynamic rendering of listing cards and implements the property filtering logic.

Installation and Setup
Follow these steps to set up both the backend and frontend components of the project.
Navigate to your MAMP htdocs directory:

 Bash
cd /Applications/MAMP/htdocs
Create the project directory and navigate into it:

 Bash
mkdir listing-project
cd listing-project
Create and activate a Python virtual environment: It's strongly recommended to use a virtual environment to manage backend dependencies.

 Bash
python3 -m venv venv
source venv/bin/activate
Set up the Backend:Create the backend directory and navigate into it:
 Bash
mkdir backend
cd backend
Install the required Python dependencies:
 Bash
pip install fastapi uvicorn
Create your FastAPI application file (main.py): This file contains FastAPI application code, including the CORS middleware and API endpoints.
Create properties.json: This file serves as a data source for property listings.
Create an images folder: This folder can store any images related to your property listings.

Set up the Frontend:


Navigate back to the listing-project root and create the frontend directory:
 Bash
cd .. # Go back to listing-project
mkdir frontend
cd frontend
Create your frontend files: Place your index.html, scripts.js, and style.css files within this directory.

Running the Application
To get the full application running, you'll need to start both the FastAPI backend and serve the static frontend.
Running the Backend
Ensure you are in the backend directory and your virtual environment is active:

 Bash
cd /Applications/MAMP/htdocs/listing-project/backend
source ../venv/bin/activate
Run the FastAPI application using Uvicorn:

 Bash
uvicorn main:app --reload

 The API will be available at http://127.0.0.1:8000.


Root endpoint: http://127.0.0.1:8000/
Properties endpoint: http://127.0.0.1:8000/properties
Interactive API documentation (Swagger UI): http://127.0.0.1:8000/docs
Alternative API documentation (ReDoc): http://127.0.0.1:8000/redoc
Serving the Frontend
Via MAMP: Place your entire listing-project folder into your MAMP's htdocs directory. Then, start your MAMP servers. Your frontend will typically be accessible via http://localhost:8888/listing-project/frontend/index.html (or similar, depending on your MAMP configuration).

Frontend Details
The frontend directory contains the static files that make up the user interface for your listing application:
index.html: This is the main entry point for your frontend. It sets up the basic structure of the page, including the layout for property listings and filter controls.
scripts.js: This JavaScript file is crucial for the interactivity of the frontend. It's responsible for:
Fetching property data from the FastAPI backend.
Dynamically rendering listing cards based on the fetched data.
Handling user input for filters (location, type, price range) and sending appropriate requests to the backend.
Updating the displayed listings based on the filtered results.
style.css: This stylesheet defines the visual presentation of your application. It includes:
Bootstrap Integration: Leverages Bootstrap's grid system for responsive layout management, ensuring the application looks good on various screen sizes.
Media Queries: Contains additional custom media queries to provide tailored styling for different devices and screen resolutions, enhancing the overall user experience.
https://github.com/satvibulgundi15/responsive-property-listing/blob/main/properties.png
https://github.com/satvibulgundi15/responsive-property-listing/blob/main/ui%20(2).png
https://github.com/satvibulgundi15/responsive-property-listing/blob/main/ui.png


