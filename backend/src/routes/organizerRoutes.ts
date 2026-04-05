import express from "express";
import * as controller from "../controllers/organizerController";

const router = express.Router();

// Organizers
router.post("/", controller.createOrganizer);
router.post("/login", controller.loginOrganizer);
router.get("/:id", controller.getOrganizer);
router.get('/:id/popups', controller.getPopUpsByOrganizer);

// so organizers can see the popups they have created

export default router;