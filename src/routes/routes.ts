import { Router } from "express";
import UploadController from "../controllers/UploadController";
import ConfirmController from "../controllers/ConfirmController";
import ListController from "../controllers/ListController";


const router = Router();
const uploadController = new UploadController();
const confirmController = new ConfirmController();
const listController = new ListController();

router.post("/upload", uploadController.uploadData);
router.patch("/confirm", confirmController.confirmedData);
router.get("/:customer_code/list", listController.getList);

export default router;