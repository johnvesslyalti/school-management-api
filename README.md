Here is a complete API documentation for your **School Management System** built using **Node.js**, **Express**, and **MySQL**:

---

# 📘 School Management API Documentation

## 🔧 Base URL

```
http://<your-host-domain>/
```

> Replace with your deployed domain or `http://localhost:5000` during local development.

---

## 📌 Overview

This RESTful API allows users to:

* Add new schools with location data.
* List all schools sorted by proximity to a specified location.

---

## 📁 Endpoints

---

### 1. **Add School**

**POST** `/addSchool`

#### 📤 Request Body (JSON)

```json
{
  "name": "Greenfield Academy",
  "address": "123 Main St, Bangalore",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

#### ✅ Validation Rules:

* All fields are **required**
* `latitude` and `longitude` must be valid numbers

#### 📥 Sample cURL

```bash
curl -X POST http://localhost:5000/addSchool \
-H "Content-Type: application/json" \
-d '{"name": "Greenfield Academy", "address": "123 Main St", "latitude": 12.9716, "longitude": 77.5946}'
```

#### 📤 Success Response (201 Created)

```json
{
  "message": "School added successfully"
}
```

#### ❌ Error Response (400 Bad Request)

```json
{
  "error": "Invalid input data"
}
```

---

### 2. **List Schools by Proximity**

**GET** `/listSchools?latitude=12.9716&longitude=77.5946`

#### 📥 Parameters

| Name      | Type  | Required | Description              |
| --------- | ----- | -------- | ------------------------ |
| latitude  | float | Yes      | User's current latitude  |
| longitude | float | Yes      | User's current longitude |

#### 📥 Sample cURL

```bash
curl "http://localhost:5000/listSchools?latitude=12.9716&longitude=77.5946"
```

#### 📤 Success Response (200 OK)

```json
[
  {
    "id": 1,
    "name": "Greenfield Academy",
    "address": "123 Main St",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "distance": 0.0
  },
  {
    "id": 2,
    "name": "City School",
    "address": "456 Second St",
    "latitude": 13.0827,
    "longitude": 80.2707,
    "distance": 291.6
  }
]
```

> Schools are returned **sorted by `distance` in ascending order.**

#### ❌ Error Response (400 Bad Request)

```json
{
  "error": "Invalid latitude or longitude"
}
```

#### ❌ Error Response (500 Server Error)

```json
{
  "error": "Database Error",
  "details": "Detailed error message"
}
```

---

## 🗃️ Database Schema

**Table**: `schools`

| Column    | Type    | Description                 |
| --------- | ------- | --------------------------- |
| id        | INT     | Primary Key, Auto-Increment |
| name      | VARCHAR | Name of the school          |
| address   | VARCHAR | School address              |
| latitude  | FLOAT   | Geographic latitude         |
| longitude | FLOAT   | Geographic longitude        |

---

## 📦 Postman Collection

You can import the provided Postman collection (JSON file or link) which includes:

* `Add School` request
* `List Schools` request with sample inputs and expected responses

➡️ **[Postman Export Help](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/)**

---

## 🌐 Deployment Notes

* Use platforms like **Render**, **Railway**, or **Cyclic** for hosting Node.js.
* MySQL can be hosted on services like **PlanetScale**, **ClearDB (Heroku)**, or **your own VPS**.
* Make sure `.env` is set correctly on your hosting platform.

---

## ✉️ Contact / Support

If sharing with stakeholders, mention how they can reach you or request changes:

> 📩 Contact: `altijohnvesslyalti@gmail.com`

---