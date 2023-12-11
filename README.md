a# Node.js Express Courses API

This Node.js Express API provides CRUD operations for managing courses, user authentication, and role-based access control. It is designed for flexibility, security, and ease of use.

## Features

- **Course Operations:** Create, Read (with pagination), Update, and Delete courses.
- **Authentication:** User registration, login, and retrieval of registered users (with pagination).
- **Role-Based Access Control:**
  - **Admin Role:** Create, Update, and Delete courses.
  - **User Role:** Read courses and retrieve a specific course.
- **Route Protection:** Certain routes are protected based on user roles.
- **Error Handling:** Robust error handling for a smooth user experience.

## Prerequisites

- Node.js installed
- MongoDB database for data storage

## Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/yourusername/node-express-courses-api.git](https://github.com/ahmedsalman74/cources_api.git)https://github.com/ahmedsalman74/cources_api.git
   cd node-express-courses-api


1. Install dependencies:
   ```bash
    npm install


2. Set up environment variables:

Create a .env file based on the provided .env.example.
Update the variables with your configuration details.

3. Start the server:
     ```bash
    node index.js

API Endpoints
Courses
GET /api/courses: Retrieve paginated list of courses.
GET/api/courses/:id: Retrieve a specific course.
POST /courses: Create a new course (Admin only).
PUT /api/courses/:id: Update a course (Admin only).
DELETE /courses/:id: Delete a course (Admin only).
Authentication
POST /api/users/register: Register a new user.
POST /api/users/login: Login and receive an authentication token.
GET /api/users?limit=10&page=1: Retrieve paginated list of registered users (Admin only).



