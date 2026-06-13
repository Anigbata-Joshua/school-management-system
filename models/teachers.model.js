import mongoose from "mongoose";

const teachersSchema = new mongoose.Schema({
    fullName: {type: String, required: [true, "Full name field cannot be empty"],trim: true},
    email: { type: String,  required: [true, "Email filed cannot be empty"],  unique: true, lowercase: t},
    phone_number: { type: String,  required: [true, "Phone filed cannot be empty"], unique: true, trim: true},
    password: { type: String,  required: [true, "Password filed cannot be empty"]},
    subject_assigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true}],
    role: { type: String, default: 'teacher', enum: ['teacher', 'head_of_department']},
    isActive: { type: Boolean, default: true}
}, { timestamps: true});

export const Teachers = mongoose.model('Teacher', teachersSchema);