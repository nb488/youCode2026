import pool from '../db';
import { Organizer } from '../types/userType';


export const createOrganizer = async (data: Organizer) => {
  const result = await pool.query(
    `INSERT INTO Organizer (name, email, phone_number, password)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [
      data.name,
      data.email,
      data.phone_number,
      data.password,
    ]
  );
  return result.rows[0];
};

export const getOrganizer = async (organizer_id: number) => {
  const result = await pool.query(
    `SELECT * FROM Organizer WHERE organizer_id = $1`,
    [organizer_id]
  );
  return result.rows[0];
};

export const loginOrganizer = async (email: string, password: string) => {
  const result = await pool.query(
    `SELECT * FROM Organizer WHERE email = $1 AND password = $2`,
    [email, password]
  );
  return result.rows[0];
};

export const getOrganizerByEmail = async (email: string) => {
  const result = await pool.query(
    `SELECT * FROM Organizer WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};





// // Volunteer Functions
// export const createVolunteer = async (data: Volunteer) => {
//   const result = await pool.query(
//     `INSERT INTO Volunteer (volunteer_id, name, email, phone_number, password)
//      VALUES ($1, $2, $3, $4, $5)
//      RETURNING *`,
//     [
//       data.volunteer_id,
//       data.name,
//       data.email,
//       data.phone_number,
//     ]
//   );
//   return result.rows[0];
// };

// export const addVolunteerToPopUp = async (pid: number, vid: number) => {
//   const result = await pool.query(
//     `INSERT INTO PopUpVolunteer (popup_id, volunteer_id)
//      VALUES ($1, $2)
//      RETURNING *`,
//     [
//       pid,
//       vid
//     ]
//   );
//   return result.rows[0];
// };

// export const getAVolunteer = async (vid: number) => {
//   const result = await pool.query(
//     `SELECT * FROM Volunteer WHERE volunteer_id = $1`,
//     [vid]
//   );
//   return result.rows[0];
// };

// export const getVolunteers = async () => {
//   const result = await pool.query(`SELECT * FROM Volunteer`);
//   return result.rows;
// };