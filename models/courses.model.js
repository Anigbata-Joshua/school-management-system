import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    courseName: {type: String, required: [true, "Course name field cannot be empty"], trim: true},
    courseCode: {type: String, required: [true, "Course code field cannot be empty"], unique: true, uppercase: true, trim: true},});

export const Course = mongoose.model('Course', CourseSchema);