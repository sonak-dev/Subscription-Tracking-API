# Subscription Tracking API

Subscription Tracking API is a production-ready backend service built using Node.js, Express.js, and MongoDB designed to help users manage, organize, and track all their subscriptions from a single place. It includes secure user authentication using JWT, modular routes, clean controller-based logic, and a scalable database schema. The goal of this project is to provide a real-world backend architecture that is simple to understand, easy to extend, and clean enough to showcase as a professional portfolio project.

This API allows users to register, log in, and manage their subscription details including name, amount, renewal dates, category, and status. The route structure is fully protected using middleware, ensuring that only authenticated users can access their data. Every part of the system—from routing to database models—follows a professional, maintainable folder structure inspired by industry standards.

To get started, clone the repository using:
git clone https://github.com/sonak-dev/Subscription-Tracking-API.git
cd Subscription-Tracking-API
Install all dependencies:
npm install
Create an .env file in the root folder and add:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
Now start the server:
npm start
The API will run on http://localhost:5000.

Available endpoints include:
POST /api/auth/register – Registers a new user  
POST /api/auth/login – Logs in and returns a JWT token  
GET /api/subscriptions – Retrieves all subscriptions for the logged-in user  
POST /api/subscriptions – Creates a new subscription  
GET /api/subscriptions/:id – Fetches details of a subscription by ID  
PUT /api/subscriptions/:id – Updates a subscription  
DELETE /api/subscriptions/:id – Deletes a subscription  

All protected routes require the Authorization header:
Authorization: Bearer <token>

Example of a valid request body when creating a subscription:
{
  "name": "Spotify",
  "amount": 199,
  "renewalDate": "2025-02-01",
  "category": "Music",
  "status": "active"
}

This backend is built with scalability and future improvements in mind. Potential upcoming enhancements include automated renewal reminders email, an analytics dashboard for tracking monthly spending.

About the Developer:  
My name is **Sonak**, a backend-focused developer passionate about building practical systems using Node.js, Express, MongoDB, and clean coding principles. I also work with C++ and DSA to strengthen my problem-solving foundations. I enjoy writing modular, maintainable code and building real-world projects that improve my skills and showcase what I am capable of.  
“Keep trying not for achievement, but to showcase your capabilities and to show what you are capable of.”

GitHub: https://github.com/sonak-dev  
LinkedIn: https://www.linkedin.com/in/sonak-jha7692  
Email: codingmastery8833@gmail.com

This project is open-source and licensed under the MIT License. Feel free to use, modify, or improve it with proper credit. A ⭐ star on GitHub is always appreciated.
