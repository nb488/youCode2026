-- Drop tables in dependency order
DROP TABLE IF EXISTS Resource;
DROP TABLE IF EXISTS PopUpVolunteer;
DROP TABLE IF EXISTS PopUp CASCADE;
DROP TABLE IF EXISTS Volunteer CASCADE;
DROP TABLE IF EXISTS Organizer CASCADE;

-- Organizers (created first, without popup_id for now)
CREATE TABLE Organizer (
    organizer_id SERIAL PRIMARY KEY,
    name         VARCHAR(50)  NOT NULL,
    email        VARCHAR(50)  UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    password     VARCHAR(255) NOT NULL
);

-- Volunteers (no password — no account needed)
CREATE TABLE Volunteer (
    volunteer_id SERIAL PRIMARY KEY,
    name         VARCHAR(50) NOT NULL,
    email        VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(20)
);

-- Pop-Ups (owned by an Organizer)
CREATE TABLE PopUp (
    popup_id          SERIAL PRIMARY KEY,
    name              VARCHAR(50)  NOT NULL,
    postal_code       CHAR(6)      NOT NULL,
    street_address    VARCHAR(100) NOT NULL,
    province          VARCHAR(50)  NOT NULL,
    city              VARCHAR(50)  NOT NULL,
    latitude          DECIMAL(9,6) NOT NULL,
    longitude         DECIMAL(9,6) NOT NULL,
    time_start        TIMESTAMP    NOT NULL,
    time_end          TIMESTAMP    NOT NULL,
    description       VARCHAR(200) NOT NULL,
    volunteers_needed INT          NOT NULL,
    organizer_id      INT          NOT NULL REFERENCES Organizer(organizer_id),
    CHECK (time_end > time_start)
);

-- Now that PopUp exists, add popup_id FK to Organizer
ALTER TABLE Organizer ADD COLUMN popup_id INT REFERENCES PopUp(popup_id);

-- Many-to-many: PopUps <-> Volunteers
CREATE TABLE PopUpVolunteer (
    popup_id     INT NOT NULL REFERENCES PopUp(popup_id) ON DELETE CASCADE,
    volunteer_id INT NOT NULL REFERENCES Volunteer(volunteer_id) ON DELETE CASCADE,
    PRIMARY KEY (popup_id, volunteer_id)
);

-- Resources collected at a PopUp
CREATE TABLE Resource (
    resource_id SERIAL PRIMARY KEY,
    popup_id    INT         NOT NULL REFERENCES PopUp(popup_id) ON DELETE CASCADE,
    name        VARCHAR(50) NOT NULL,
    type        VARCHAR(50) NOT NULL
);

-- Sample Data

INSERT INTO Organizer (organizer_id, name, email, phone_number, password) VALUES
(1, 'Grace L', 'gracel@example.com', '555-0001', '123'),
(2, 'Henry', 'henry@example.com', '555-0002', '123');
(3, 'Lila', 'lila@example.com', '555-0003', '123'),
(4, 'Jacob', 'jacob@example.com', '555-0004', '123'),
(5, 'Mike', 'mike@example.com', '555-0005', '123'),
(6, 'Marcus', 'marcus@example.com', '555-0006', '123'),
(7, 'Jade', 'jade@example.com', '555-0007', '123'),
(8, 'Lia', 'lia@example.com', '555-0008', '123'),
(9, 'Grace P', 'gracep@example.com', '555-0009', '123'),
(10, 'Kevin', 'kevin@example.com', '555-0011', '123'),

INSERT INTO Volunteer (volunteer_id, name, email, phone_number) VALUES
(1, 'Alice Johnson',   'alice12.johnson@example.com',   '555-1234'),
(2, 'Bob Smith',       'bob134.smith@example.com',       '555-5678'),
(3, 'Charlie Lee',     'charlie13.lee@example.com',     '555-9012'),
(4, 'Dana Kim',        'dana34.kim@example.com',        '555-3456'),
(5, 'Evelyn Thompson', 'evelyn234.thompson@example.com', NULL),
(6, 'Franklin Rivera', 'franklin46.rivera@example.com', NULL);
(7, 'Alec Johnson',   'alice87.johnson@example.com',   '555-1234'),
(8, 'Bob Smith',       'bob467.smith@example.com',       '555-5678'),
(9, 'Charlie Lee',     'charlie87.lee@example.com',     '555-9012'),
(10, 'Dana Kim',        'dana26.kim@example.com',        '555-3456'),
(11, 'Evelyn Thompson', 'evelyn145.thompson@example.com', NULL),
(12, 'Franklin Rivera', 'franklin8743.rivera@example.com', NULL);

INSERT INTO PopUp (name, postal_code, street_address, province, city, latitude, longitude, time_start, time_end, description, volunteers_needed, organizer_id) VALUES
('Downtown Donation Hub',    'V5K0A1', '123 Main St',  'British Columbia', 'Vancouver', 49.282729, -123.120738, '2026-04-05 09:00:00', '2026-04-05 17:00:00', 'Donation Pop up',    10, 1),
('Eastside Community Drive', 'V6B1C2', '456 East Ave', 'British Columbia', 'Vancouver', 49.274174, -123.098530, '2026-04-06 10:00:00', '2026-04-06 18:00:00', 'Donation Pop up', 8, 2),
('Toys Donation Pop up',    'V5K0A1', '123 Main St',  'British Columbia', 'Vancouver', 49.2435, 122.9712, '2026-04-05 09:00:00', '2026-04-05 17:00:00', 'Donation Pop up',    10, 3),
('Clothes Donation Pop up', 'V6B1C2', '456 East Ave', 'British Columbia', 'Vancouver', 49.1672, 123.1336, '2026-04-06 10:00:00', '2026-04-06 18:00:00', 'Donation Pop up', 8, 4),
('Shoes Donation Pop up',    'V5K0A1', '123 Main St',  'British Columbia', 'Vancouver', 49.1910, 122.8490, '2026-04-05 09:00:00', '2026-04-05 17:00:00', 'Donation Pop up',    10, 5),
('Coquitlam Community Drive', 'V6B1C2', '456 East Ave', 'British Columbia', 'Vancouver', 49.3195, 123.0726, '2026-04-06 10:00:00', '2026-04-06 18:00:00', 'Donation Pop up', 8, 6),
('Downtown Donation Center',    'V5K0A1', '123 Main St',  'British Columbia', 'Vancouver', 49.3400, 123.1500, '2026-04-05 09:00:00', '2026-04-05 17:00:00', 'Donation Pop up',    10, 7),
('Donation Hub 12 Ave', 'V6B1C2', '456 East Ave', 'British Columbia', 'Vancouver', 49.2985, 122.7937, '2026-04-06 10:00:00', '2026-04-06 18:00:00', 'Donation Pop up', 8, 8);
('Clothes Donation Pop up',    'V5K0A1', '123 Main St',  'British Columbia', 'Vancouver', 49.2606, 123.2460, '2026-04-05 09:00:00', '2026-04-05 17:00:00', 'Donation Pop up',    10, 9),
('Eastside Community Drive', 'V6B1C2', '456 East Ave', 'British Columbia', 'Vancouver', 49.3429, 123.1145, '2026-04-06 10:00:00', '2026-04-06 18:00:00', 'Donation Pop up', 8, 10);


-- Link organizers to their pop-ups
UPDATE Organizer SET popup_id = 1 WHERE organizer_id = 1;
UPDATE Organizer SET popup_id = 2 WHERE organizer_id = 2;
UPDATE Organizer SET popup_id = 3 WHERE organizer_id = 3;
UPDATE Organizer SET popup_id = 4 WHERE organizer_id = 4;
UPDATE Organizer SET popup_id = 5 WHERE organizer_id = 5;
UPDATE Organizer SET popup_id = 6 WHERE organizer_id = 6;
UPDATE Organizer SET popup_id = 7 WHERE organizer_id = 7;
UPDATE Organizer SET popup_id = 8 WHERE organizer_id = 8;
UPDATE Organizer SET popup_id = 9 WHERE organizer_id = 9;
UPDATE Organizer SET popup_id = 10 WHERE organizer_id = 10;

INSERT INTO PopUpVolunteer (popup_id, volunteer_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 11),
(4, 8),
(5, 9),
(6, 10);

INSERT INTO Resource (popup_id, name, type) VALUES
(1, 'Canned Food',    'Food'),
(1, 'Blankets',       'Clothing'),
(2, 'Rice Bags',      'Food'),
(2, 'Winter Jackets', 'Clothing'),
(2, 'First Aid Kits', 'Medical Supplies');