import express from "express";
import * as controller from "../controllers/popupController";

const router = express.Router();

router.post("/", controller.createPopUp);
router.put("/:id", controller.updatePopUp);
router.get("/", controller.getPopUps);
router.get("/:id", controller.getPopUp);
router.delete("/:id", controller.deletePopUp);
router.post("/:id/volunteers", controller.addVolunteer);

export default router;