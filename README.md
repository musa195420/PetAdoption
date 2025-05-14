[PetAdoption.postman_collection.json](https://github.com/user-attachments/files/20177322/PetAdoption.postman_collection.json)# 🐾 Pet Adoption App Backend

This is the backend service for the **Pet Adoption** platform built with **Next.js**, **Express.js**, **PostgreSQL**, and **Supabase**. It is designed to manage the core operations for pet donors, adopters, pets, health records, secure meetups, messaging, and more.

---

## ◉ Features

- ⦿ **JWT Authentication**
  - Secure login with JWT
  - ⦿ Refresh token flow using the previous token

- ⦿ **Image Upload**
  - Image upload using `multer`
  - Direct storage to Supabase bucket

- ⦿ **MVC Architecture**
  - Clear separation between Controllers, Services, and Routers

- ⦿ **Supabase Integration**
  - Used for PostgreSQL DB and media storage

---

## ◎ Database Schema

The project is backed by a relational PostgreSQL schema managed in Supabase. Key entities include:

- ◎ `users`
- ◎ `pet`, `breed`, `animaltype`
- ◎ `donorprofile`, `adopterprofile`
- ◎ `favorites`, `message`, `meetuprequest`, `securemeetup`
- ◎ `healthinfo`, `disease`, `disability`, `vaccination`

🗂️ Relational structure example:  
![supabase-schema-oddfvsiltlgqlpyfwkmi (3)](https://github.com/user-attachments/assets/c944d406-ba46-4338-bd69-a97b57fb06f2)


---
---

## ⦿ API Modules

Each module under `api/` follows an MVC pattern:
- `*.controller.js` → Handles HTTP requests and responses
- `*.service.js` → Handles business logic and Supabase interactions
- `*.router.js` → Defines Express.js routes

---

## ⦿ Validation

Input validation is handled with schemas located in the `validation/` directory for:
- Adopter
- Donor
- Pet
- User

---

## ◎ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/musa195420/PetAdoption
   cd PetAdoption



   add .env file in root
| #Key                       | #Description                                | #Example                                 |
|----------------------------|---------------------------------------------|------------------------------------------|
| `APP_PORT`                 | Port on which the backend runs              | `3020`                                   |
| `SUPABASE_SERVICE_ROLE_KEY`| Supabase service role key (keep secret)     | `your-service-role-key`                  |
| `SUPABASE_URL`             | Supabase project URL                        | `https://your-project.supabase.co`       |
| `SUPABASE_KEY`             | Supabase anon/public key                    | `your-supabase-anon-key`                 |
| `MYSQL_DB`                 | MySQL database name                         | `petadoption`                            |
| `ACCESS_TOKEN_SECRET`      | Secret key for access token JWT             | `your-access-token-secret`               |
| `REFRESH_TOKEN_SECRET`     | Secret key for refresh token JWT            | `your-refresh-token-secret`              |
| `MONGODB_URL`              | MongoDB URL for storing crash logs          | `mongodb+srv://user:pass@host/db`        |
| `TOKEN_TIME`               | Token expiry time in hours                  | `3`                                      |



## Postman Request All 74 Implemented
Find in git repo Name Pet Adoption Postman.txt



