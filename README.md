# 📚 MERN LMS (Learning Management System)

A modern **Learning Management System (LMS)** built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  
The project uses **Tailwind CSS** and **shadcn/ui** for a sleek, responsive UI, and integrates **Google OAuth** for secure authentication.  

---

## 🚀 Features
- 🔑 **Google OAuth Authentication** as well as Email, Password Authentication  
- 🎨 **Modern UI** – styled with **TailwindCSS** & **shadcn/ui components**  
- 👩‍🏫 **Role-based Access** – Students, Tutors  
- 📘 **Course Management** – create, update, and manage courses  
- 💳 **Payments Integration** – with [**Polar.sh**](https://polar.sh) (Sandbox Mode) for testing  
- 📸 **Image & Video Storage** - with [**https://cloudinary.com/**](https://cloudinary.com/)
- 📊 **Dashboard & Analytics** – track enrollments and performance  
- ⚡ **API-driven** – REST APIs with Express.js and MongoDB  
---


> ## Key features are demonstrated in the video and screenshots below.
> 🌐 **Live Demo:**  
> [https://mern-lms-frontend-1tp8.onrender.com/](https://mern-lms-frontend-1tp8.onrender.com/)
>
> 📹 **Demo Video:**  
>[Watch video on youtube](https://youtu.be/ZVTU75JmZYY)
>  
> 📸 **Screenshots**
><img width="1920" height="1080" alt="Screenshot (431)" src="https://github.com/user-attachments/assets/5ea441ba-815f-49fd-b88c-9f87e6ec19fe" />
><img width="1920" height="1080" alt="Screenshot (430)" src="https://github.com/user-attachments/assets/287ac787-b07f-4f81-bbed-02f4e04abdde" />
><img width="1920" height="1080" alt="Screenshot (434)" src="https://github.com/user-attachments/assets/c614dea3-af11-4ac8-8b87-8cb06c9b5df0" />


---

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  
- shadcn/ui  

**Backend**  
- Node.js  
- Express.js  
- MongoDB  

**Auth**  
- Google OAuth  
- Email, Password  

**Payments**  
- Polar.sh (Sandbox Mode)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/smdevji/MERN-LMS.git
cd MERN-LMS
```

### 2️⃣ Install dependencies
**Frontend**
```bash
cd frontend
npm install
```

**Backend**
```bash
cd backend
npm install
```

### 3️⃣ Configure environment variables  
Create a `.env` file inside `backend/` like this (You can also follow `.env.example` file provided):  
```env
# Backend environment variables
API_PORT=3000
FRONTEND_URL=http://localhost:5173
MONGODB_URL=mongodb://localhost:27017/MernLMS
JWT_SECRET='Abc123'
JWT_EXPIRESIN='15m'
OAUTH_CLIENT_ID=1234-abcd.apps.googleusercontent.com

CLOUDINARY_CLOUD_NAME=abcde
CLOUDINARY_API_KEY=1234
CLOUDINARY_API_SECRET=abcdef

POLAR_OAT=polar_oat_abcd
POLAR_API_URL=https://sandbox-api.polar.sh
POLAR_WEBHOOK_SECRET=polar_whs_abcd
```

Create a `.env` file inside `frontend/` like this:  
```env
# Frontend environment variables
VITE_BACKEND_URL=http://localhost:3000
VITE_OAUTH_CLIENT_ID=12345-abcdef.apps.googleusercontent.com
VITE_CLOUDINARY_UPLOAD_PRESET=Project1
VITE_CLOUDINARY_CLOUD_NAME=abcdef
VITE_CLOUDINARY_API_KEY=12345
```

### 4️⃣ Run the project
**Backend**
```bash
cd backend
node index.js
```

**Frontend**
```bash
cd frontend
npm run dev
```

The app will be available at **http://localhost:5173**.



---

## 📜 License
This project is licensed under the **MIT License**.

