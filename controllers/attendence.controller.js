import { Attendance } from "../models/attendance.model.js";

//Create a New Attendance Record
export const createAttendance = async (req, res) => {
    try {
        const {
            studentId,
            courseId,
            date,
            status
        } = req.body;

        const attendance = new Attendance({
            studentId,
            courseId,
            date,
            status
        });

        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();

        attendanceRecords.length === 0 ?
            res.status(404).json({ message: "No attendance records found" })
            : res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};