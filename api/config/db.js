//configuração banco de dados db

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error){
    console.log("erro ao conectar no mangoDB: ", error)
    process.exit(1) //sair

    }
}