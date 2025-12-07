# ⚙️ Anvaya CRM — Backend API

A production-ready REST API powering the Anvaya CRM platform. Built using **Node.js, Express, MongoDB, Mongoose** with support for validation, filtering, commenting, and reporting.

---

## 🌍 Live Demo

| Layer   | URL                                        |
| ------- | ------------------------------------------ |
| Backend | https://anvaya-crm-backend-001.vercel.app/ |

---

## 📂 Project Structure

```
server/
 ┣ models/
 ┣ controllers/
 ┣ routes/
 ┣ config/
 ┣ server.js
 ┗ README.md
```

---

## 🛠 Tech Stack

| Component  | Technology                       |
| ---------- | -------------------------------- |
| Runtime    | Node.js                          |
| Framework  | Express                          |
| Database   | MongoDB with Mongoose ORM        |
| Deployment | Vercel / Railway / Render        |
| Security   | CORS / Validation / Sanitization |

---

## 🚀 Setup

### Install dependencies

```sh
npm install
```

### Environment Setup

Create `.env`:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### Run Server

```sh
npm run dev
```

---

## 📡 API Reference

### Leads API

| Method | Endpoint     | Action                   |
| ------ | ------------ | ------------------------ |
| POST   | `/leads`     | Create                   |
| GET    | `/leads`     | List (filters supported) |
| GET    | `/leads/:id` | Get one                  |
| PUT    | `/leads/:id` | Update                   |
| DELETE | `/leads/:id` | Remove                   |

### Agents API

| Method | Endpoint      | Action |
| ------ | ------------- | ------ |
| POST   | `/agents`     | Create |
| GET    | `/agents`     | List   |
| DELETE | `/agents/:id` | Remove |

### Comments API

| Method | Endpoint              | Action       |
| ------ | --------------------- | ------------ |
| POST   | `/leads/:id/comments` | Add comment  |
| GET    | `/leads/:id/comments` | Get comments |

### Reporting API

| Method | Endpoint            | Action                 |
| ------ | ------------------- | ---------------------- |
| GET    | `/report/last-week` | Weekly closure summary |
| GET    | `/report/pipeline`  | Active pipeline count  |

---

## ✔ Best Practices Included

- Validation (Mongoose + Custom Rules)
- Error‑handling with meaningful messages
- ObjectId verification
- Sorting, filtering & pagination support

---

## 🛠 Recommended Tools

- Postman or Thunder Client
- MongoDB Compass
- VSCode REST Client

---

## 🚧 Future Enhancements

- JWT Security (Auth Middleware)
- Role‑based access control
- API Rate Limiting
- Swagger Documentation

---

## 📜 License

Licensed under the **MIT License**.

---

### ⭐ If you like this project, consider giving a **GitHub Star**!

Made with ❤️ by Abdul Kalam
