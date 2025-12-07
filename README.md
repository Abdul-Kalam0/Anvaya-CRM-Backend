# 🚀 Anvaya CRM - Backend API

A scalable and production-ready backend system designed for **Lead Management, Sales Agent Tracking, Comments, & Reporting**, built using **Node.js, Express, and MongoDB**.  
This serves as the backend for the Anvaya CRM platform.

---

## 🌍 Live API Base URL

🔗 [Live Demo](https://anvaya-crm-backend-001.vercel.app/)

---

## 🛠 Tech Stack

| Technology | Purpose                |
| ---------- | ---------------------- |
| Node.js    | Backend runtime        |
| Express.js | Routing & Middleware   |
| MongoDB    | Database               |
| Mongoose   | Schema & Validation    |
| CORS       | Secure frontend access |
| Vercel     | Deployment             |

---

## 📦 Project Structure

```
📦 anvaya-crm-backend
 ┣ 📁 config
 ┃ ┗ db.config.js
 ┣ 📁 controllers
 ┣ 📁 routes
 ┣ 📁 models
 ┣ index.js
 ┣ server.js
 ┣ package.json
 ┗ README.md
```

---

## ⚙ Environment Variables

Create a `.env` file in the root:

```
PORT=3000
MONGO_URI=your-mongodb-connection-string
```

---

## 🚀 Getting Started

### **Clone the repository**

```sh
git clone https://github.com/Abdul-Kalam0/Anvaya-CRM-Backend.git
cd anvaya-crm-backend
```

### **Install dependencies**

```sh
npm install
```

### **Start development server**

```sh
npm run dev
```

Your API will run on:

```
http://localhost:3000
```

---

## 📡 API Documentation

### 🧩 Leads API

| Method | Endpoint     | Description                      |
| ------ | ------------ | -------------------------------- |
| POST   | `/leads`     | Create a new lead                |
| GET    | `/leads`     | Get all leads (supports filters) |
| GET    | `/leads/:id` | Get a single lead                |
| PUT    | `/leads/:id` | Update lead                      |
| DELETE | `/leads/:id` | Delete lead                      |

🔍 **Supported Query Filters:**  
`salesAgent`, `status`, `source`, `tags`

---

### 👨‍💼 Sales Agents API

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| POST   | `/agents`     | Create new agent |
| GET    | `/agents`     | Get all agents   |
| DELETE | `/agents/:id` | Remove an agent  |

---

### 💬 Comments API

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/leads/:id/comments` | Add a comment to specific lead |
| GET    | `/leads/:id/comments` | List all comments for a lead   |

---

### 📊 Reporting API

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/report/last-week` | Leads closed in the last 7 days |
| GET    | `/report/pipeline`  | Count of active/pending leads   |

---

## 🛡 Validation & Error Handling

- Full request validation using Mongoose
- Descriptive JSON error responses
- Duplicate email protection
- ObjectId validation for Mongo queries

---

## 🧪 Recommended Tools

- Postman / Thunder Client
- MongoDB Compass
- VS Code

---

## 🚧 Future Roadmap

- JWT Authentication
- Role-based access control
- Export reports (PDF/CSV)
- Cron job reminders

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork this repo and submit a PR.

---

## 📜 License

Licensed under the **MIT License**.

---

### ⭐ If this project helped you, don't forget to star the repo!
