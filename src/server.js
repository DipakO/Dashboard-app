import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5050;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/user', userRoute)
app.use('/auth', authRoute)

app.listen(port, () => console.log(`Server starts on port ${port}`))