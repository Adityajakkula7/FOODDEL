import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://akshath:food123@cluster0.udr0p.mongodb.net/food')
    .then(() => {
        console.log("DB connected");
    })
}