import pool from '../db';


// Volunteer Functions
export const createVolunteer = async (data: any) => {
  const result = await pool.query(
    `INSERT INTO Volunteer (volunteer_id, name, email, phone_number, password)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      data.volunteer_id,
      data.name,
      data.email,
      data.phone_number,
    ]
  );
  return result.rows[0];
};

export const addVolunteerToPopUp = async (data: any) => {
  const result = await pool.query(
    `INSERT INTO PopUpVolunteer (popup_id, volunteer_id)
     VALUES ($1, $2)
     RETURNING *`,
    [
      data.popup_id,
      data.volunteer_id,
    ]
  );
  return result.rows[0];
};

export const getAVolunteer = async (data: any) => {
  const result = await pool.query(
    `SELECT * FROM Volunteer WHERE volunteer_id = $1`,
    [data.volunteer_id]
  );
  return result.rows[0];
};

export const getVolunteers = async () => {
  const result = await pool.query(`SELECT * FROM Volunteer`);
  return result.rows;
};


// Member Functions
export const createOrganizer = async (data: any) => {
  const result = await pool.query(
    `INSERT INTO Organizer (organizer_id, name, email, phone_number, password)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      data.organizer_id,
      data.name,
      data.email,
      data.phone_number,
      data.password,
      data.center_id,
    ]
  );
  return result.rows[0];
};

