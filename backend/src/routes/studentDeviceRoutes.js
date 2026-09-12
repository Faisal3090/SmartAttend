import express from "express";
import {
  completeStudentDeviceRegistration,
  legacyStudentDeviceRegistration,
  startStudentDeviceRegistration,
} from "../controllers/studentDeviceController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/device/register/start",
  authenticate,
  authorize("STUDENT"),
  startStudentDeviceRegistration,
);

router.post(
  "/device/register/complete",
  authenticate,
  authorize("STUDENT"),
  completeStudentDeviceRegistration,
);

router.post(
  "/device",
  authenticate,
  authorize("STUDENT"),
  legacyStudentDeviceRegistration,
);

export default router;
