import {regStudent, getAllStudents, } from "../controllers/student.controller.js";
import express from "express";

const router = express.Router();
router.post("/reg-student", regStudent);
router.get("/get-students", getAllStudents);
export default router;