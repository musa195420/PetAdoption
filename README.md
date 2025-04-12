"# PetAdoption" 
All Sql queries
-- USERS TABLE
CREATE TABLE Users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(10) CHECK (role IN ('Admin', 'Adopter', 'Donor')) NOT NULL,
  device_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROFILES
CREATE TABLE DonorProfile (
  donor_id UUID PRIMARY KEY REFERENCES Users(user_id),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE AdopterProfile (
  adopter_id UUID PRIMARY KEY REFERENCES Users(user_id),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE
);

-- ANIMAL CLASSIFICATION
CREATE TABLE AnimalType (
  animal_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL
);

CREATE TABLE Breed (
  breed_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID REFERENCES AnimalType(animal_id),
  name VARCHAR(100) NOT NULL
);

-- PET TABLE
CREATE TABLE Pet (
  pet_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES DonorProfile(donor_id),
  name VARCHAR(255) NOT NULL,
  animal_type UUID REFERENCES AnimalType(animal_id),
  breed_id UUID REFERENCES Breed(breed_id),
  age INTEGER,
  gender VARCHAR(10),
  description TEXT,
  is_approved VARCHAR(10) CHECK (is_approved IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
  rejection_reason TEXT,
  is_live BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- HEALTH MODULE
CREATE TABLE Vaccination (
  vaccine_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID REFERENCES AnimalType(animal_id),
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE Disease (
  disease_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID REFERENCES AnimalType(animal_id),
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE Disability (
  disability_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID REFERENCES AnimalType(animal_id),
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE HealthInfo (
  health_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES Pet(pet_id),
  vaccination_id UUID REFERENCES Vaccination(vaccine_id),
  disease_id UUID REFERENCES Disease(disease_id),
  disability_id UUID REFERENCES Disability(disability_id)
);

-- MESSAGING
CREATE TABLE Message (
  message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES Users(user_id),
  receiver_id UUID REFERENCES Users(user_id),
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAVORITES
CREATE TABLE Favorites (
  fav_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES Users(user_id),
  pet_id UUID REFERENCES Pet(pet_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MEETUPS
CREATE TABLE MeetupRequest (
  meetup_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES Pet(pet_id),
  donor_id UUID REFERENCES DonorProfile(donor_id),
  adopter_id UUID REFERENCES AdopterProfile(adopter_id),
  location VARCHAR(255),
  time TIMESTAMP,
  is_accepted_by_donor BOOLEAN DEFAULT FALSE,
  is_accepted_by_adopter BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE SecureMeetup (
  secure_meetup_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meetup_id UUID REFERENCES MeetupRequest(meetup_id),
  proof_pic_url TEXT,
  adopter_id_front_url TEXT,
  adopter_id_back_url TEXT,
  phone_number VARCHAR(20),
  current_address TEXT,
  time TIMESTAMP,
  submitted_by VARCHAR(10) CHECK (submitted_by IN ('Donor', 'Adopter'))
);
