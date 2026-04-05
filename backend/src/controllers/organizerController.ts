import { Request, Response } from "express";
import { Organizer } from '../types/userType';
import * as service from "../services/organizerService";

export const createOrganizer = async (req: Request, res: Response) => {
  try {
    const result = await service.createOrganizer(req.body);
    res.status(201).json(result as Organizer);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrganizer = async (req: Request, res: Response) => {
  try {
    const organizerId = Number(req.params.id);
    if (!Number.isInteger(organizerId) || organizerId <= 0) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const organizer = await service.getOrganizer(organizerId);
    if (!organizer) {
      return res.status(404).json({ error: "Organizer not found" });
    }
    res.status(200).json(organizer);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginOrganizer = async (req: Request, res: Response) => {
const { email, password } = req.body;

if (!email || !password) {
  return res.status(400).json({ error: "Email and password are required" });
}

  try {
    const result = await service.loginOrganizer(email, password);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


// export const createVolunteer = async (req: Request, res: Response) => {
//   try {
//     const result = await service.createVolunteer(req.body);
//     res.status(201).json(result);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// };


// export const addVolunteerToPopUp = async (req: Request, res: Response) => {
// const popupId = Number(req.params.popupId);
// const volunteerId = Number(req.params.volunteerId);

// if (isNaN(volunteerId) || isNaN(popupId)) {
//   return res.status(400).json({ error: "Invalid ID" });
// }

//   try {
//     const result = await service.addVolunteerToPopUp(popupId, volunteerId);
//     res.status(200).json(result);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// };


// export const getAVolunteer = async (req: Request, res: Response) => {
// const volunteerId = Number(req.params.volunteerId);

// if (isNaN(volunteerId)) {
//   return res.status(400).json({ error: "Invalid ID" });
// }

//   try {
//     const result = await service.getAVolunteer(volunteerId);
//     res.status(200).json(result);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const getVolunteers = async (req: Request, res: Response) => {
//   try {
//     const result = await service.getVolunteers();
//     res.status(200).json(result);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// };

