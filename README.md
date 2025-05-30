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
    npm install or npm install --legacy-peer-deps # or yarn install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev # or yarn start
    ```
    The frontend application will typically open in your browser at `http://localhost:3000`.
