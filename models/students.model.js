import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "First name field cannot be empty"],trim: true},
    lastName: {type: String, required: [true, "Last name field cannot be empty"],trim: true},
    gender: {type: String, required: [true, "This field cannot be empty"],enum: ['Male', 'Female', 'Other']},
    email: { type: String,  required: [true, "Email filed cannot be empty"],  unique: true, lowercase: true},
    dob: { type: Date,  required: [true, "Date of birth filed cannot be empty"]},
    phone: {type: String,required: [true, "Guardian/Student phone number is required"],trim: true},
    password: { type: String,  required: [true, "Password filed cannot be empty"]},
}, { timestamps: true});

export const Student = mongoose.model('Students', StudentSchema);