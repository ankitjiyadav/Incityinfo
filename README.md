# 📞 CRM - Customer Relationship Management App

This is a full-stack CRM web application that helps manage customer leads efficiently. It includes **role-based access** for Admins and Telecallers, allowing features like adding leads, updating call status, and viewing performance reports.

---

## 🚀 Live Demo

- 🔗 Deployed App: [https://yourapp.vercel.app](https://ankityadavcrm.netlify.app/)
- 📁 GitHub Repo: [https://github.com/ankitjiyadav/CRM](https://github.com/ankitjiyadav/Incityinfo)
---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Frontend on Netlify, Backend on Render

---

## 🔐 Role-Based Access Control

| Role        | Permissions                                                                 |
|-------------|------------------------------------------------------------------------------|
| **Admin**   | Access to dashboard with call metrics, connected call records               |
| **Telecaller** | Can add, edit, delete leads, and update lead status                     |

Roles are assigned at login, and protected routes ensure that users access only their authorized features.

---

## ✨ Features

- ✅ Secure login & logout
- 📋 Add / Edit / Delete customer leads
- 🔁 Update lead status (Connected / Not Connected) with response options
- 📊 Admin dashboard shows total leads, telecallers, and connected calls
- ⏱ Real-time call tracking with timestamps and telecaller identity
- 📱 Responsive UI with Tailwind CSS
- 📁 Popup forms for lead management

---

## 🛠️ How to Run This Project

### 📂 Clone the Repository

```bash
git clone https://github.com/ankitjiyadav/Incityinfo
cd CRM
