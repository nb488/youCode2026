import pool from '../db';

export interface Resource {
    popup_id: number;
    name: string;
    type: number;
}

export const findResourcesByPopUpId = async (popup_id: number): Promise<Resource[]> => {
    const result = await pool.query(
        'SELECT * FROM Resource WHERE popup_id = $1',
        [popup_id]
    );
    return result.rows;
};

// for updating a popup, we will delete all existing resources and add the new ones
export const addResourceToPopUp = async (popup_id: number, name: string, type: number): Promise<void> => {
    await pool.query(
        'INSERT INTO Resource (popup_id, name, type) VALUES ($1, $2, $3)',
        [popup_id, name, type]
    );
}

export const deleteResourcesByPopUpId = async (popup_id: number): Promise<void> => {
    await pool.query(
        'DELETE FROM Resource WHERE popup_id = $1',
        [popup_id]
    );
}

