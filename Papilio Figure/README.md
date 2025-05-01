# Papilio Figure Collection

## Overview

Papilio Figure Collection is a Django-powered web application that allows users to track their anime figurine collections and wishlists. It offers features such as:
- Personal collection tracking
- Wishlist management
- Price tracking
- User reviews and ratings

The website is designed with a pink/purple color theme inspired by Solaris Japan's website design.

## Features

- **User Authentication**: Users can register, log in, and manage their collections securely.
- **Collection Tracking**: Users can add figurines to their collection with details such as price, description, and images.
- **Wishlist**: Users can maintain a wishlist of figurines they want to acquire.
- **Figurine Details**: Each figurine has a detailed page with information such as name, price, description, and an image.
- **User Reviews**: Users can leave reviews and ratings for figurines.

## Tech Stack

- **Frontend**: React (with React Router v6)
- **Backend**: Django (for REST API and dynamic content)
- **Database**: SQLite (for local development) / PostgreSQL (production)
- **Styling**: Custom CSS

## Installation

### Prerequisites

Before setting up this project, ensure you have the following installed:

- Python 3.x
- Node.js and npm
- Django 4.x or later
- React 18.x or later

### Setup Backend (Django)

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/papilio-figure.git
    cd papilio-figure-collection
    ```

2. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Apply migrations:

    ```bash
    python manage.py migrate
    ```

5. Create a superuser to access the admin panel (optional):

    ```bash
    python manage.py createsuperuser
    ```

6. Start the Django development server:

    ```bash
    python manage.py runserver
    ```

### Setup Frontend (React)

1. Navigate to the `frontend` folder:

    ```bash
    cd frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

4. Open the app in your browser at `http://localhost:3000`.

### API Endpoints

The API for managing figurines is available at:

- **GET /api/figurines/**: Fetch all figurines.
- **GET /api/figurines/{id}/**: Fetch details of a specific figurine.
- **POST /api/figurines/{id}/add_to_collection/**: Add a figurine to your collection.
- **POST /api/figurines/{id}/add_to_wishlist/**: Add a figurine to your wishlist.
