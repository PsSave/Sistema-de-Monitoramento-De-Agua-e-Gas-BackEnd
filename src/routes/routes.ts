import { Router } from "express";
import UploadController from "../controllers/UploadController";
import ConfirmController from "../controllers/ConfirmController";


const router = Router();
const uploadController = new UploadController();
const confirmController = new ConfirmController();

router.post("/upload", uploadController.uploadData);
router.patch("/confirm", confirmController.confirmedData);

export default router;