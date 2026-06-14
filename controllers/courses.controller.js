import { Course } from "../models/course.model.js";

// 1. Create/Register a New Course
export const createCourse = async (req, res) => {
    try {
        const { courseName, courseCode } = req.body;

        const formattedCode = courseCode ? courseCode.trim().toUpperCase() : "";
        
        const existingCourse = await Course.findOne({ courseCode: formattedCode });
        if (existingCourse) {
            return res.status(400).json({ 
                message: `A course with code ${formattedCode} already exists` 
            });
        }

        // Create and save the new course
        const newCourse = new Course({
            courseName,
            courseCode: formattedCode
        });

        await newCourse.save();

        res.status(201).json({
            message: "Course created successfully",
            course: newCourse
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Error creating course", 
            error: error.message 
        });
    }
};

//Get All Courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        if (courses.length === 0) {
            return res.status(404).json({ 
                message: "No courses found" 
            });
        }

        res.status(200).json({
            message: "Courses fetched successfully",
            totalCourses: courses.length,
            data: courses
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching courses", 
            error: error.message 
        });
    }
};