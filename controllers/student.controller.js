import { Student } from "../models/students.model.js";
import bcrypt from "bcrypt"; 

export const regStudent = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            gender,
            dob,
            password,
        } = req.body;

        //Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        //Current date and the birth date
        const today = new Date();
        const birthDate = new Date(dob);

        //Substrate current date from the dob
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();

        //Check if their birthday hasn't happened yet this year
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            calculatedAge--; // Subtract 1 year because they haven't reached their birthday yet
        }

        if (calculatedAge < 10) {
            return res.status(400).json({
                message: 'Student must be 10 years old or above'
            });
        }

        //Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create and Save the Student Document
        const newStudent = new Student({
            firstName,
            lastName,
            email,
            gender,
            dob,
            password: hashedPassword, // Store the secure hashed password
        });

        await newStudent.save();

        // Remove password from response for security
        newStudent.password = undefined;

        res.status(201).json({
            message: "Student created successfully",
            student: newStudent
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating student", error: error.message });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        if (students.length === 0) {
            return res.status(404).json({
                message: 'No students found'
            });
        }

        res.status(200).json({
            message: 'Students found successfully',
            totalStudents: students.length,
            data: students
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
};