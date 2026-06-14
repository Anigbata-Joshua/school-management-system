import {attendence, getAllAttendence, } from "../controllers/attendence.controller.js";
import express from "express";

const router = express.Router();
router.post("/attendence", attendence);
router.get("/get-attendence", getAllAttendence);

export default router;