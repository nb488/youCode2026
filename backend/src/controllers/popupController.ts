import { Request, Response } from "express";
import { findPopUpByIdService, findPopUpsService, createPopUpService, updatePopUpService, deletePopUpService, addVolunteerToPopUpService } from "../services/popupService";

export const createPopUp = async (req: Request, res: Response) => {
    try {
        // console.log('req.body:', req.body); // ← add this
        validatePopUpData(req.body);
        const result = await createPopUpService(req.body);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const updatePopUp = async (req: Request, res: Response) => {
    try {
        validatePopUpData(req.body);
        const popupId = Number(req.params.id);
        const result = await updatePopUpService(popupId, req.body);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

function validatePopUpData(data: any) {
    const requiredFields = ['name', 'postal_code', 'street_address', 'province', 'city', 
                           'time_start', 'time_end', 'description', 'volunteers_needed', 
                           'organizer_id', 'resources'];
    for (const field of requiredFields) {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    if (!Array.isArray(data.resources)) {
        throw new Error("Resources must be an array");
    }
}

export const getPopUps = async (req: Request, res: Response) => {
    try {
        const { city, resource_type } = req.query;
        const result = await findPopUpsService(city as string, resource_type as string);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getPopUp = async (req: Request, res: Response) => {
    try {
        const popupId = Number(req.params.id);
        const result = await findPopUpByIdService(popupId);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const deletePopUp = async (req: Request, res: Response) => {
    try {
        const popupId = Number(req.params.id);
        await deletePopUpService(popupId);
        res.status(200).json({
            message: "Pop-up deleted successfully"
        });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const addVolunteer = async (req: Request, res: Response) => {    
    try {
        const popupId = Number(req.params.id);
        await addVolunteerToPopUpService(popupId, req.body);
        res.status(201).json({ message: "Volunteer added successfully" });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }   
}