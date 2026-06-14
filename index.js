import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.route.js";
import teacherRoutes from "./routes/teachers.route.js";
import courseRoutes from "./routes/courses.route.js";
import attendenceRoutes from "./routes/attendence.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4500;
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/attendence", attendenceRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
