import mongoose from "mongoose";

const connectDB = async() => {
try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://dipakohol070_db_user:Password@cluster0.s9xug1j.mongodb.net/?appName=Cluster0");
    console.log("MongoDB Atlas connected");
} catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
}
}

export default connectDB;