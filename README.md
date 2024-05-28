# Stratex Backend Assignment

This project implements a backend system for user and seller registration, book management, and authentication using JWT.

## Features

1. User and seller registration (signup) with name, email, and password.
2. Login functionality for both users and sellers using email and password.
3. JWT for handling authentication.
4. Sellers can upload a CSV file to add multiple books to the database.
5. Sellers can view, edit, and delete their own books.
6. Sellers cannot access or modify books uploaded by other sellers.
7. Users can log in and retrieve a list of all books in the database.
8. Users can view details of a specific book.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT for authentication
- Multer for file uploads
- bcrypt for password hashing
- csv-parser for parsing CSV files

## Setup and Installation

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ashutoshsrms/Stratex-Bookstore-Backend
   cd Stratex-Bookstore-Backend

   ```

2. Install the dependencies:

   ```sh
   npm install

   ```

3. Create a .env file in the root directory and add the following:

   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

   ```

4. Build the project:

   ```sh
   npm run build

   ```

5. Start the server:

   ```sh
   npm start

   ```

6. Running in Development Mode
   To run the server in development mode with automatic restarts on file changes, use:
   ```sh
   npm run dev
   ```

## API Endpoints

## Authentication

    - Register: POST /api/auth/register

    - Login: POST /api/auth/login

## Books

- Upload Books (Seller only): POST /api/books/upload

  - Upload a CSV file containing book details.

- Get All Books: GET /api/books
  - Retrieve a list of all books in the database.
- Get Book by ID: GET /api/books/:id
  - Retrieve details of a specific book by ID.
- Update Book (Seller only): PUT /api/books/:id

  - Update details of a specific book by ID (only if the book belongs to the seller).

- Delete Book (Seller only): DELETE /api/books/:id
  - Delete a specific book by ID (only if the book belongs to the seller).

## Contributing

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes.
- Commit your changes (git commit -m 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Open a Pull Request.
