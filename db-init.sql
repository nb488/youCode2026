
DROP TABLE Volunteer;

DROP TABLE Center;

DROP TABLE Organizer;

DROP TABLE Resource;

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

-- Centers
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

-- Many-to-many relationship: Centers <-> Volunteers
CREATE TABLE CenterVolunteer (
    center_id INT NOT NULL REFERENCES Center(center_id),
    volunteer_id INT NOT NULL REFERENCES Volunteer(volunteer_id),
    PRIMARY KEY (center_id, volunteer_id)
);

-- Resources (one-to-many: Center -> Resource)
CREATE TABLE Resource (
    resource_id SERIAL PRIMARY KEY,
    center_id INT NOT NULL REFERENCES Center(center_id),
    name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL
);



-- INSERT SAMPLE DATA
-- -----------------------------
-- Volunteers
-- -----------------------------
INSERT INTO Volunteer (volunteer_id, name, email, phone_number) VALUES
(1, 'Alice Johnson', 'alice.johnson@example.com', '555-1234'),
(2, 'Bob Smith', 'bob.smith@example.com', '555-5678'),
(3, 'Charlie Lee', 'charlie.lee@example.com', '555-9012'),
(4, 'Dana Kim', 'dana.kim@example.com', '555-3456');

-- -----------------------------
-- Organizers
-- -----------------------------
INSERT INTO Organizer (organizer_id, name) VALUES
(1, 'Evelyn Thompson'),
(2, 'Franklin Rivera');

-- -----------------------------
-- Centers
-- -----------------------------
INSERT INTO Center (postal_code, province, city, time, description, organizer_id) VALUES
('V5K0A1', 'British Columbia', 'Vancouver', '2026-04-05 09:00:00', 'Downtown donation hub', 1),
('V6B1C2', 'British Columbia', 'Vancouver', '2026-04-06 10:00:00', 'Eastside community center', 2);

-- -----------------------------
-- CenterVolunteer (many-to-many)
-- -----------------------------
-- Center 1 has Alice and Bob
INSERT INTO CenterVolunteer (center_id, volunteer_id) VALUES
(1, 1),
(1, 2);

-- Center 2 has Charlie and Dana
INSERT INTO CenterVolunteer (center_id, volunteer_id) VALUES
(2, 3),
(2, 4);

-- -----------------------------
-- Resources (one-to-many: Center -> Resource)
-- -----------------------------
INSERT INTO Resource (center_id, name, type) VALUES
(1, 'Canned Food', 'Food'),
(1, 'Blankets', 'Clothing'),
(2, 'Rice Bags', 'Food'),
(2, 'Winter Jackets', 'Clothing'),
(2, 'First Aid Kits', 'Medical Supplies');