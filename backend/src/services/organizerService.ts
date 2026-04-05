import * as repo from "../models/organizerModel";
import { Organizer } from '../types/userType';

export const createOrganizer = async (data: Organizer) => {
    if (!data.name || !data.email || !data.password) {
    throw new Error("Name, email and password are required");
    }
    return await repo.createOrganizer(data);
};

export const getOrganizer = async (vid: number) => {
    if (!vid) { throw new Error("Invalid ID") } 

    const organizer = await repo.getOrganizer(vid);
    if (!organizer) { throw new Error("Organizer not found")}
    
    return organizer;
};


export const loginOrganizer = async (email: string, pass: string) => {
    if (!email || !pass) { throw new Error("Email and password are required")}

    const organizer = await repo.getOrganizerByEmail(email);
    if (!organizer) { throw new Error("Organizer not found") }
    if (organizer.password !== pass) { throw new Error("Invalid password")}

    return await repo.loginOrganizer(organizer.organizer_id, pass);
};




// export const createVolunteer = async (data: Volunteer) => {

//     if (!data.volunteer_id || !data.name || !data.email || !data.phone_number) {
//     throw new Error("Missing required fields");
//     }
//     return await repo.createVolunteer(data);
// };


// export const addVolunteerToPopUp = async (pid: number, vid:number) => {

//     if (!pid || !vid) {
//     throw new Error("Missing required fields");
//     }
//     return await repo.addVolunteerToPopUp(pid, vid);
// };


// export const getAVolunteer = async (vid: number) => {
//     if (!vid) {
//     throw new Error("Missing required fields");
//     }
//     return await repo.getAVolunteer(vid);
// };

// export const getVolunteers = async () => {
//   return await repo.getVolunteers();
// };

