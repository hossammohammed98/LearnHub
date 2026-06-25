# 🎓 Ta'allam (تعلّم) E-Learning Platform

**Ta'allam (تعلّم)** is a comprehensive, full-stack E-Learning platform designed for the Egyptian market. It integrates an AI-driven personalized learning experience with dedicated portals for instructors, students, and parents to ensure seamless tracking, communication, and dynamic academic management.

---

## ✨ Key Features

### 👨‍🎓 Student Hub
* **Interactive Dashboard:** View active courses, check overall progress analytics, and access daily tasks.
* **Academic Calendar:** A built-in schedule management system featuring dynamic calendar items for live sessions and assignment deadlines.
* **Personalized Paths:** Adaptive content tailored to fit individual student learning capabilities.

### 👨‍🏫 Instructor Portal
* **Course Management:** Full CRUD operations to create, update, and manage courses, chapters, and rich media content.
* **Performance Analytics:** Deep insights into student enrollment rates, engagement, and completion tracking.

### 👪 Parent Portal
* **Real-time Monitoring:** Dedicated access for parents to follow up on their children's learning curves.
* **Family Performance:** Consolidated metric cards and activity logs providing quick academic overviews.

### 💬 Core System Features
* **Real-Time Communication:** Secure chat layout with dynamic conversation items bridging students and instructors.
* **Role-Based Authentication:** Strict access control (Student, Teacher, Parent) powered by JWT tokens.
* **Arabic-First Design (RTL):** Fully optimized responsive interface utilizing highly modern typography like `ibmPlexArabic`.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js (App Router, Server-Side Rendering, and Optimized Routing).
* **State Management:** Redux Toolkit (Centralized via global `<StoreProvider>`).
* **Styling:** Tailwind CSS (Utility-first, responsive, and adaptive layout styling).

### Backend
* **Runtime & Framework:** Node.js & Express.js (Clean MVC/Feature-based API Architecture).
* **Database:** MongoDB & Mongoose (NoSQL storage for complex user and course schemas).
* **Real-Time:** Socket.io (Powering instant chat messaging and notification dispatches).
* **Security:** JSON Web Tokens (JWT) for secure session authentication.

---

## 📁 Project Structure

```text
taallam/
├── client/      # Next.js frontend application (Components, Features, Layouts)
└── server/      # Node.js & Express backend application (APIs, Models, Controllers)
