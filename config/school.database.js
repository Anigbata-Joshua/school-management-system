import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
try {
        const connectedDB = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected successfully: ${connectedDB.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        
        // Exit the node process immediately with a failure code (1)
        process.exit(1);
    }
};