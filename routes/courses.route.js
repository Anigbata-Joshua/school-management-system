import {createCourse, getAllCourses, } from "../controllers/course.controller.js";
import express from "express";

const router = express.Router();
router.post("/create-course", createCourse);
router.get("/get-courses", getAllCourses);
export default router;