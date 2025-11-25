<p align="center">
  <img src="https://github.com/sonak-dev/Subscription-Tracking-API/blob/main/ChatGPT%20Image%20Nov%2026%2C%202025%2C%2012_24_05%20AM.png" width="100%" alt="Project Banner"/>
</p>

<h1 align="center">📦 Subscription Tracking API</h1>

<p align="center">
  A modern, clean and production-ready backend system to manage and track all your subscriptions efficiently.<br>
  Built with ❤️ using <b>Node.js</b>, <b>Express.js</b> and <b>MongoDB</b>.
</p>

---

## 🌟 Overview

Subscription Tracking API is a fully functional backend designed to help users manage, organize, and track all their subscriptions in one place.  
It uses **JWT authentication**, **secure middleware**, **MongoDB database**, and a **clean modular structure**, making it ideal for portfolios, real-world projects, and scalable production systems.

The API lets users register, log in, add subscriptions, edit them, delete them, and fetch subscription lists — all protected via secure authentication.

---

## 🔥 Features

- 🔐 **JWT Authentication** for secure access  
- 📄 **CRUD operations** for subscriptions  
- 🛡 **Protected routes** using middleware  
- 🗂 **Organized folder structure (MVC inspired)**  
- ⚡ Fast, scalable, and production-ready  
- 🌱 Easy to extend with AI, analytics, notifications, etc.  

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/sonak-dev/Subscription-Tracking-API.git
cd Subscription-Tracking-API
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create a `.env` file
```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Start the Server
```bash
npm start
```

👉 API now runs at: **http://localhost:5000**

---

## 🔗 API Endpoints

```
POST    /api/auth/register        → Register a new user
POST    /api/auth/login           → Login and receive token

GET     /api/subscriptions        → Get all subscriptions
POST    /api/subscriptions        → Create subscription
GET     /api/subscriptions/:id    → Get subscription by ID
PUT     /api/subscriptions/:id    → Update subscription
DELETE  /api/subscriptions/:id    → Delete subscription
```

🔒 **Protected routes require header:**
```
Authorization: Bearer <token>
```

---

## 📄 Example Subscription JSON

```json
{
  "name": "Spotify",
  "amount": 199,
  "renewalDate": "2025-02-01",
  "category": "Music",
  "status": "active"
}
```

---

## 🚀 Future Enhancements

- 🔔 Email & SMS renewal reminders  
- 📊 Analytics dashboard for monthly spending  
- 🤖 AI-based anomaly detection  
- 📱 React/Next.js frontend  
- 🐳 Docker container support  
- 🧪 Tests (Jest / Supertest)  

---

## 👨‍💻 About the Developer

Hey! I’m **Sonak** 👋  
A backend-focused developer passionate about Node.js, Express, MongoDB, and writing clean, maintainable, real-world code.  
I am also improving my logic with **C++ & DSA**, and I enjoy building projects that actually solve problems.

💬 *“Keep trying not for achievement, but to showcase your capabilities and to show what you are capable of.”*

---

## 🌐 Connect With Me

- GitHub: https://github.com/sonak-dev  
- LinkedIn: https://www.linkedin.com/in/sonak-jha7692  
- Email: codingmastery8833@gmail.com  

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and improve it with proper credit.  
⭐ If you like this project, a star on GitHub means a lot!
