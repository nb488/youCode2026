import express from "express";
import * as controller from "../controllers/popupController";

const router = express.Router();

router.post("/", controller.createPopUp);
router.post("/:id", controller.updatePopUp);
router.get("/", controller.getPopUps);
router.get("/:id", controller.getPopUp);
router.delete("/:id", controller.deletePopUp);
// router.post("/:id/volunteers/:volunteerId", controller.addVolunteerToPopUp);

export default router;