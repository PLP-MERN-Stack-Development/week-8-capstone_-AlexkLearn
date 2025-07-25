
# 🛠️ Mtaa-Fix

**Mtaa-Fix** is a full-stack MERN web application designed to connect everyday users with skilled service providers (fundis) in their local area. It supports real-time reviews, provider profiles, role-based access, and a clean modern interface powered by Tailwind CSS v4.1.

---

## ANNOUNCEMENT!!

This Project is still under development and many fubctionalities are not working  
For collaboration and other issues email me at [Alex📩](kimaria117@gmail.com)

---

## 🚀 Features

### 👥 User Roles
- **User**: Can search providers, leave/edit reviews.
- **Provider**: Can create profiles, reply to/report reviews.
- **Admin**: Manages users, providers, and reviews from dashboard.

### 📄 Core Functionalities
- Register/Login with JWT Auth
- Create & edit provider profiles
- Upload profile picture (with preview & resize)
- Leave, edit, reply to, and report reviews
- Search & filter providers by skill or location
- Pagination for providers and reviews
- Fully responsive UI + Dark Mode toggle
- Admin dashboard with user management

---

## 🧱 Tech Stack

| Layer      | Tech                                       |
|------------|--------------------------------------------|
| **Frontend** | React, Vite, Tailwind CSS v4.1            |
| **Backend**  | Node.js, Express, MongoDB (Mongoose)      |
| **Auth**     | JWT (token-based)                         |
| **Storage**  | Cloudinary + Multer for image uploads     |
| **State**    | React Context API + Custom Hooks          |

---

## 📁 Folder Structure

```
/Mtaa-Fix
├── /client         # React frontend
│   ├── /public
│   ├── /src
│   │   ├── /assets
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /hooks
│   │   ├── /context
│   │   ├── /utils
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── /server         # Node.js backend
│   ├── /config
│   ├── /controllers
│   ├── /database
│   ├── /middleware
│   ├── /models
│   ├── /routes
│   ├── /utils
│   ├── app.js
│   ├── .env
│   └── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env.development.local` and `.env.production.local`:

```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

Run dev server:

```bash
npm run dev
```

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
```

Tailwind CSS v4.1 setup:

```bash
npm install tailwindcss @tailwindcss/vite
```

**vite.config.js**:

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [tailwindcss()],
})
```

**index.css**:

```css
@import "tailwindcss";
```

Run dev server:

```bash
npm run dev
```

---

## 🌍 API Endpoints (Quick Overview)

### 🧾 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### 👤 Users
- `GET /api/users/me`

### 🧑‍🔧 Providers
- `POST /api/providers`
- `GET /api/providers?page=1&skill=plumber&location=kibera`
- `GET /api/providers/:id`

### ⭐ Reviews
- `POST /api/reviews/:providerId`
- `PUT /api/reviews/:reviewId`
- `POST /api/reviews/reply/:reviewId`
- `POST /api/reviews/report/:reviewId`

### 🔐 Admin
- `GET /api/admin/users`
- `PUT /api/admin/promote/:id`
- `DELETE /api/admin/users/:id`

---

## 🔐 Authentication

- JWT stored in `localStorage`
- Auth headers sent via Axios interceptor
- Protected routes using `ProtectedRoute` component
- Role-based access checks: `user`, `provider`, `admin`

---

## 🌗 UI Features

- Responsive layout (`sm`, `md`, `lg`, `xl`, `2xl`)
- `dark:` class-based dark mode with toggle
- Form validation (phone, email, password)
- Image preview + client-side resize before upload
- Reusable components: cards, buttons, forms, modals

---

## ✨ Future Improvements (coming soon..)

- Toast notifications via `react-hot-toast`
- Unit tests (Jest/React Testing Library)
- PWA support for offline usage
- Drag-and-drop file upload
- Email/phone verification

---

## 📦 Deployment

- **Frontend**: [Vercel](https://vercel.com)
- **Backend**: [Render](https://render.com)

---

## 📜 License

This project is open-sourced under the MIT License.

---

## 🤝 Contributing

Want to contribute and improve the current CodeBase? PRs welcome!  
Clone the repo → create a feature branch → submit a pull request.

---

## 👤 Author

Built with 💻 by [Alex_Kimari](https://github.com/AlexkLearn)

> For more updates or support, feel free to reach out.
