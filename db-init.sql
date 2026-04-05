-- Drop child tables first
DROP TABLE IF EXISTS Resource;
DROP TABLE IF EXISTS PopUpVolunteer;
DROP TABLE IF EXISTS PopUp CASCADE;
DROP TABLE IF EXISTS Member CASCADE;


-- Organizers 
-- One-to-many relationship: Organizer -> PopUp
CREATE TABLE Organizer (
    organizer_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    center_id INT
);

-- Volunteers
CREATE TABLE Volunteer (
    volunteer_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(20)
);

-- Centers / PopUps
CREATE TABLE PopUp (
    popup_id SERIAL PRIMARY KEY,
    postal_code CHAR(6) NOT NULL,
    street_address VARCHAR(100) NOT NULL,
    province VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    time_start TIMESTAMP NOT NULL,
    time_end TIMESTAMP NOT NULL,
    description VARCHAR(200) NOT NULL,
    organizer_id INT NOT NULL REFERENCES Organizer(organizer_id),
    CHECK (time_end > time_start)
);

-- Many-to-many relationship: PopUps <-> Volunteers
CREATE TABLE PopUpVolunteer (
    popup_id INT NOT NULL REFERENCES PopUp(popup_id) ON DELETE CASCADE,
    volunteer_id INT NOT NULL REFERENCES Volunteer(volunteer_id),
    PRIMARY KEY (popup_id, volunteer_id)
);

-- Resources (one-to-many: PopUp -> Resource) 
-- Note this specifies the resources that the PopUp is collecting 
CREATE TABLE Resource (
    resource_id SERIAL PRIMARY KEY,
    popup_id INT NOT NULL REFERENCES PopUp(popup_id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL
);

-- Sample Data
INSERT INTO Volunteer (volunteer_id, name, email, password, phone_number) VALUES
(1, 'Alice Johnson', 'alice.johnson@example.com', 'hashed_password_1', '555-1234'),
(2, 'Bob Smith', 'bob.smith@example.com', 'hashed_password_2', '555-5678'),
(3, 'Charlie Lee', 'charlie.lee@example.com', 'hashed_password_3', '555-9012'),
(4, 'Dana Kim', 'dana.kim@example.com', 'hashed_password_4', '555-3456'),
(5, 'Evelyn Thompson', 'evelyn.thompson@example.com', 'hashed_password_5', NULL),
(6, 'Franklin Rivera', 'franklin.rivera@example.com', 'hashed_password_6', NULL);

INSERT INTO PopUp (postal_code, street_address, province, city, latitude, longitude, time_start, time_end, description, organizer_id) VALUES
('V5K0A1', '123 Main St', 'British Columbia', 'Vancouver', 49.282729, -123.120738, '2026-04-05 09:00:00', '2026-04-05 17:00:00', 'Downtown donation hub', 5),
('V6B1C2', '456 East Ave', 'British Columbia', 'Vancouver', 49.274174, -123.098530, '2026-04-06 10:00:00', '2026-04-06 18:00:00', 'Eastside community center', 6);

INSERT INTO PopUpVolunteer (popup_id, volunteer_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4);

INSERT INTO Resource (popup_id, name, type) VALUES
(1, 'Canned Food', 'Food'),
(1, 'Blankets', 'Clothing'),
(2, 'Rice Bags', 'Food'),
(2, 'Winter Jackets', 'Clothing'),
(2, 'First Aid Kits', 'Medical Supplies');