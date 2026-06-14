import { Teacher } from "../models/teachers.model.js";
import bcrypt from 'bcrypt';

export const regTeacher = async (req, res) => {
    try {
        const {
            fullname,
            email,
            gender,
            phone_number,
            subject_assigned,
            password,
        } = req.body;

        const existingTeacher = await Teacher.findOne({ email });

        if (existingTeacher) {
            return res.status(400).json({
                message: 'Student already exist'
            });
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newTeacher = new Teacher({
            fullname,
            email,
            gender,
            phone_number,
            subject_assigned,
            password: hashedPassword
        });

        await newTeacher.save();
        newTeacher.password = undefined;

        res.status(201).json({
            message: 'Teacher created successfully',
            teacher: newTeacher
        })

    } catch (error) {
        res.status(500).json({
            message: "Error creating student", error: error.message
        });
    };
};

export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();

        if (teachers.length === 0) {
            return res.status(404).json({
                message: 'No teacher found'
            });
        }

        res.status(200).json({
            message: 'Teachers fetched successfully',
            totalTeacher: teachers.length,
            data: teachers
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
};