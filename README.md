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
APP_PORT=3020
SUPABASE_SERVICE_ROLE_KEY= Supabase Service Roll Key
SUPABASE_URL=Supabase Url
SUPABASE_KEY= Supbase Key
MYSQL_DB=petadoption
ACCESS_TOKEN_SECRET=" 676ea5e59ec5002fc446b3bbc1681aec1a6f12e835fa101b55b8d381249f8f75"  // Any Random
REFRESH_TOKEN_SECRET=" 7d628b52b4fbcb60f3d2fd3fc844b866f96478ce3d168ec55f19817bd41da3d6" // Any Random
MONGODB_URL=Mongodb Url For store log file crash Analytics 
TOKEN_TIME=3



## Postman Request All 74 Implemented
Find in git repo Name Pet Adoption Postman.txt



