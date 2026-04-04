-- Drop child tables first
DROP TABLE IF EXISTS CenterVolunteer;
DROP TABLE IF EXISTS Resource;
DROP TABLE IF EXISTS PopUp;
DROP TABLE IF EXISTS Volunteer;
DROP TABLE IF EXISTS Organizer;

-- Volunteers
CREATE TABLE Volunteer (
    volunteer_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(20)
);

-- Organizers
CREATE TABLE Organizer (
    organizer_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Centers / PopUps
CREATE TABLE PopUp (
    center_id SERIAL PRIMARY KEY,
    postal_code CHAR(6) NOT NULL,
    province VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    time_start TIMESTAMP NOT NULL,
    time_end TIMESTAMP NOT NULL,
    description VARCHAR(200) NOT NULL,
    organizer_id INT NOT NULL REFERENCES Organizer(organizer_id)
);

-- Many-to-many relationship: PopUps <-> Volunteers
CREATE TABLE CenterVolunteer (
    center_id INT NOT NULL REFERENCES PopUp(center_id),
    volunteer_id INT NOT NULL REFERENCES Volunteer(volunteer_id),
    PRIMARY KEY (center_id, volunteer_id)
);

-- Resources (one-to-many: PopUp -> Resource)
CREATE TABLE Resource (
    resource_id SERIAL PRIMARY KEY,
    center_id INT NOT NULL REFERENCES PopUp(center_id),
    name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL
);

-- Sample Data

INSERT INTO Volunteer (volunteer_id, name, email, phone_number) VALUES
(1, 'Alice Johnson', 'alice.johnson@example.com', '555-1234'),
(2, 'Bob Smith', 'bob.smith@example.com', '555-5678'),
(3, 'Charlie Lee', 'charlie.lee@example.com', '555-9012'),
(4, 'Dana Kim', 'dana.kim@example.com', '555-3456');

INSERT INTO Organizer (organizer_id, name) VALUES
(1, 'Evelyn Thompson'),
(2, 'Franklin Rivera');

INSERT INTO PopUp (postal_code, province, city, time_start, time_end, description, organizer_id) VALUES
('V5K0A1', 'British Columbia', 'Vancouver', '2026-04-05 09:00:00', '2026-04-05 17:00:00', 'Downtown donation hub', 1),
('V6B1C2', 'British Columbia', 'Vancouver', '2026-04-06 10:00:00', '2026-04-06 18:00:00', 'Eastside community center', 2);

INSERT INTO CenterVolunteer (center_id, volunteer_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4);

INSERT INTO Resource (center_id, name, type) VALUES
(1, 'Canned Food', 'Food'),
(1, 'Blankets', 'Clothing'),
(2, 'Rice Bags', 'Food'),
(2, 'Winter Jackets', 'Clothing'),
(2, 'First Aid Kits', 'Medical Supplies');