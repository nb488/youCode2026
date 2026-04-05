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
(1, 'Grace Organizer', 'grace@example.com', '555-0001', 'hashed_password_org_1'),
(2, 'Henry Organizer', 'henry@example.com', '555-0002', 'hashed_password_org_2');

INSERT INTO Volunteer (volunteer_id, name, email, phone_number) VALUES
(1, 'Alice Johnson',   'alice.johnson@example.com',   '555-1234'),
(2, 'Bob Smith',       'bob.smith@example.com',       '555-5678'),
(3, 'Charlie Lee',     'charlie.lee@example.com',     '555-9012'),
(4, 'Dana Kim',        'dana.kim@example.com',        '555-3456'),
(5, 'Evelyn Thompson', 'evelyn.thompson@example.com', NULL),
(6, 'Franklin Rivera', 'franklin.rivera@example.com', NULL);

INSERT INTO PopUp (name, postal_code, street_address, province, city, latitude, longitude, time_start, time_end, description, volunteers_needed, organizer_id) VALUES
('Downtown Donation Hub',    'V5K0A1', '123 Main St',  'British Columbia', 'Vancouver', 49.282729, -123.120738, '2026-04-05 09:00:00', '2026-04-05 17:00:00', 'Downtown donation hub',    10, 1),
('Eastside Community Drive', 'V6B1C2', '456 East Ave', 'British Columbia', 'Vancouver', 49.274174, -123.098530, '2026-04-06 10:00:00', '2026-04-06 18:00:00', 'Eastside community center', 8, 2);

-- Link organizers to their pop-ups
UPDATE Organizer SET popup_id = 1 WHERE organizer_id = 1;
UPDATE Organizer SET popup_id = 2 WHERE organizer_id = 2;

INSERT INTO PopUpVolunteer (popup_id, volunteer_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4);

INSERT INTO Resource (popup_id, name, type) VALUES
(1, 'Canned Food',    'Food'),
(1, 'Blankets',       'Clothing'),
(2, 'Rice Bags',      'Food'),
(2, 'Winter Jackets', 'Clothing'),
(2, 'First Aid Kits', 'Medical Supplies');