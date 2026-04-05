import pool from '../db';
import { findResourcesByPopUpId } from './resourceModel';

interface PopupQuery {
    city?: string;
    resource_type?: string;
}

interface PopupData {
    description: string;
    name: string;
    street_address: string;
    city: string;
    province: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    volunteers_needed: number;
    time_start: string;
    time_end: string;
    organizer_id: number;
}

async function getPopUpResourceAndVolunteers(id: number) {
    const resources = findResourcesByPopUpId(id);
    const volunteerResult = await pool.query(
        `SELECT v.volunteer_id, v.name, v.email, v.phone_number FROM Volunteer v
         JOIN PopUpVolunteer pv ON pv.volunteer_id = v.volunteer_id
         WHERE pv.popup_id = $1`,
        [id]
    );
    return {
        resources: resources,
        volunteers: volunteerResult.rows
    };
}

export const findAllPopUps = async (query: PopupQuery) => {
    const { city, resource_type } = query;

    let popupQuery = `
        SELECT p.*, o.name AS organizer_name, o.email AS organizer_email, o.phone_number AS organizer_phone
        FROM PopUp p
        JOIN Organizer o ON o.organizer_id = p.organizer_id
    `;
    const params: string[] = [];

    if (city && resource_type) {
        popupQuery += ` JOIN Resource r ON r.popup_id = p.popup_id
                        WHERE p.city = $1 AND r.type = $2`;
        params.push(city, resource_type);
    } else if (city) {
        popupQuery += ' WHERE p.city = $1';
        params.push(city);
    } else if (resource_type) {
        popupQuery += ` JOIN Resource r ON r.popup_id = p.popup_id
                        WHERE r.type = $1`;
        params.push(resource_type);
    }

    const popupResult = await pool.query(popupQuery, params);
    const popups = popupResult.rows;

    const popupsWithDetails = await Promise.all(popups.map(async (popup) => {
        const details = await getPopUpResourceAndVolunteers(popup.popup_id);
        return { ...popup, ...details };
    }));

    return popupsWithDetails;
};

export const findPopUpById = async (id: number) => {
    const result = await pool.query(
        `SELECT p.*, o.name AS organizer_name, o.email AS organizer_email, o.phone_number AS organizer_phone
         FROM PopUp p
         JOIN Organizer o ON o.organizer_id = p.organizer_id
         WHERE p.popup_id = $1`,
        [id]
    );
    const popup = result.rows[0];
    if (!popup) return null;
    const details = await getPopUpResourceAndVolunteers(id);
    return { ...popup, ...details };
};

export const createPopUp = async (data: PopupData) => {
    const result = await pool.query(
        `INSERT INTO PopUp 
            (description, street_address, city, province, postal_code, latitude, longitude, time_start, time_end, organizer_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [data.description, data.street_address, data.city, data.province, data.postal_code,
         data.latitude, data.longitude, data.time_start, data.time_end, data.organizer_id]
    );
    return result.rows[0];
};

export const updatePopUp = async (id: number, data: PopupData) => {
    const result = await pool.query(
        `UPDATE PopUp SET
            description = $1,
            street_address = $2,
            city = $3,
            province = $4,
            postal_code = $5,
            latitude = $6,
            longitude = $7,
            time_start = $8,
            time_end = $9
         WHERE popup_id = $10
         RETURNING *`,
        [data.description, data.street_address, data.city, data.province, data.postal_code,
         data.latitude, data.longitude, data.time_start, data.time_end, id]
    );
    return result.rows[0];
};

export const deletePopUp = async (id: number) => {
    const result = await pool.query('DELETE FROM PopUp WHERE popup_id = $1', [id]);
    return result.rowCount;
};

interface Volunteer {
    name: string,
    email: string,
    phone_number: string | undefined
}

export const addVolunteerToPopUp = async (popup_id: number, volunteer: Volunteer) => {
    // check if volunteer already exists based on email
    const { name, email, phone_number } = volunteer;
    let volunteerResult = await pool.query('SELECT * FROM Volunteer WHERE email = $1', [volunteer.email]);
    if (volunteerResult.rows.length === 0) {
        // create new volunteer
        volunteerResult = await pool.query(
            'INSERT INTO Volunteer (name, email, phone_number) VALUES ($1, $2, $3) RETURNING *',
            [name, email, phone_number]
        );    
    }

    try {
        const result = await pool.query(
          'INSERT INTO PopUpVolunteer (popup_id, volunteer_id) VALUES ($1, $2)',
          [popup_id, volunteerResult.rows[0].volunteer_id]
        );
        return result;
      } catch (err: any) {
        if (err.code === '23505') { // unique violation
          return null; // volunteer already signed up for this pop-up, ignore the error
        }
        throw err; 
      }
}