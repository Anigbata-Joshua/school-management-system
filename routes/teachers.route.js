import {reTeacher, getAllTeachers, } from "../controllers/teacher.controller.js";
import express from "express";

const router = express.Router();
router.post("/reg-teacher", reTeacher);
router.get("/get-teachers", getAllTeachers);
export default router;