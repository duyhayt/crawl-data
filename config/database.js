import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ Database Connection Error:', error);
        process.exit(1);
    }
};

export default connectDB;

