import { Router } from "express";
import UploadController from "../controllers/UploadController";


const router = Router();
const uploadController = new UploadController();

router.post("/upload", uploadController.uploadData);

export default router;