# 🚀 Job Tracker (Full Stack MERN App)

A full stack Job Tracker application that helps users manage and track their job applications efficiently.

 ✨ Features

- 🔐 Authentication (Email + Password & Google OAuth)
- 📋 Add, update, and delete job applications
- 📊 Track application status (Applied / Interview / Rejected)
- 👤 Profile management with image upload
- ⚡ Clean and responsive UI
- 🔒 Secure routes using JWT authentication


 🛠️ Tech Stack

 Frontend
- React.js
- Tailwind CSS
- Axios

 Backend
- Node.js
- Express.js

 Database
- MongoDB (Mongoose)

 Authentication
- JWT (JSON Web Token)
- Google OAuth

 📂 Project Structure


job-tracker-backend/
│
├── client/ # React frontend
├── src/
│ ├── controllers/ # Business logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── middleware/ # Custom middleware
│ └── config/ # DB config
│
├── uploads/ # Profile images (ignored in git)
├── server.js # Entry point
├── package.json


 🔁 API Endpoints

 Auth & Users
- POST /api/users/signup
- POST /api/users/login
- POST /api/auth/google

 Applications
- GET /api/applications
- POST /api/applications
- PUT /api/applications/:id
- DELETE /api/applications/:id



 ⚙️ Setup Instructions

 1. Clone the repo
git clone https://github.com/your-username/job-tracker-backend.git  
cd job-tracker-backend

2. Install dependencies
npm install  
cd client  
npm install  

 3. Setup environment variables

Create a `.env` file in root:

MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  
GOOGLE_CLIENT_ID=your_google_client_id  

 4. Run the project

Backend:
npm run dev  

Frontend:
cd client  
npm run dev  



 🔐 Authentication Flow

- User logs in → backend verifies credentials  
- JWT token generated and sent to client  
- Client stores token and sends it in headers for protected routes  



🧠 What I Learned

- Full stack application architecture (frontend + backend integration)  
- Authentication using JWT and Google OAuth  
- REST API design and CRUD operations  
- File upload handling with Multer  
- State management and API handling in React  

 🚧 Future Improvements

- Deploy full application (Frontend + Backend)  
- Add filters and search functionality  
- Improve UI/UX further  
- Add analytics dashboard  


 🔗 GitHub Repository

https://github.com/your-username/job-tracker-backend  


 🙌 Feedback

Open to feedback and suggestions!
