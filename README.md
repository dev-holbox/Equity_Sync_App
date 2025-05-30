# Equity Project

This project consists of a backend API built with FastAPI and a frontend application built with React, designed for monitoring and managing surgical center operations.

## Project Structure

The project is divided into two main directories:

-   `Equity_Backend/`: Contains the Python FastAPI application responsible for handling API requests, interacting with AWS services (like Bedrock for text extraction), and processing data.
-   `Equity_demo/`: Contains the React frontend application, providing the user interface for the dashboard, inventory monitoring, and other features.

## Setup

To set up and run the project locally, follow these steps:

### 1. Backend Setup (`Equity_Backend`)

1.  Navigate to the backend directory:
    ```bash
    cd Equity_Backend
    ```
2.  (Recommended) Create and activate a Python virtual environment (using Python 3.9 or higher):
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3.  Install the required Python dependencies:
    ```bash
    pip install fastapi PyPDF2 boto3 uvicorn
    ```
4.  Configure AWS Credentials:
    Ensure your AWS credentials and default region (`us-east-2`) are configured for `boto3` to access AWS Bedrock. You can do this by:
    *   Setting environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`).
    *   Configuring the AWS credentials file (`~/.aws/credentials`) and config file (`~/.aws/config`).
5.  Run the backend server:
    ```bash
    uvicorn app:app --reload
    ```
    The backend API will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup (`Equity_demo`)

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd Equity_demo
    ```
2.  Install the required Node.js dependencies (make sure you have Node.js and npm/yarn installed):
    ```bash
    npm install  # or yarn install
    ```
3.  Start the frontend development server:
    ```bash
    npm start  # or yarn start
    ```
    The frontend application will typically open in your browser at `http://localhost:3000`.

## Features

The project currently includes the following features:

-   **Inventory Monitoring:** A page (`/inventory-monitoring`) to track surgical supplies and equipment with a styled table and alerts.
-   **Dashboard:** A dashboard page (`/dashboard`) displaying key performance indicators.
    -   **Patient Throughput Charts:** Weekly, Monthly, and Yearly line charts showing patient volume.
    -   **Surgeon Case Volume Chart:** A combined bar and line chart comparing actual vs. expected cases and equity targets for surgeons, with dynamic data based on selected time periods (Week, Month, Year).
    -   **Fixed Navigation:** The header and sidebar are fixed, allowing only the main content to scroll. The user profile section is fixed at the bottom of the sidebar.
-   **PDF Text Extraction:** The backend includes an endpoint (`/extract-text`) to extract text from uploaded PDF files using PyPDF2 and process it with AWS Bedrock to get specific values (Safe Harbor Clause, Ownership Limits, etc.).

## Future Improvements

-   Integrate backend API calls into the frontend charts and tables to display real data instead of sample data.
-   Implement full functionality for all navigation links and pages.
-   Enhance UI/UX based on user feedback.
-   Add more detailed error handling and loading states.
-   Implement user authentication and authorization.
