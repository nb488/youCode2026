import express from "express";
import * as controller from "../controllers/organizerController";

const router = express.Router();

// Volunteers
// should verify params !!!!!
// router.post("/volunteers", controller.createVolunteer);
// router.get("/volunteers", controller.getVolunteers);
// router.get("/volunteers/:id", controller.getAVolunteer);

// Assign volunteer to popup
// router.post("/popups/:popupId/volunteers/:volunteerId", controller.addVolunteerToPopUp);

// Organizers
router.post("/", controller.createOrganizer);
router.post("/login", controller.loginOrganizer);
router.get("/:id", controller.getOrganizer);

export default router;