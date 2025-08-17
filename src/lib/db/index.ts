"use server"
import "server-only";

import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGO_URI || "";

if(!MONGODB_URL){
    throw new Error("Please define MONGO_URI in enviroment variable");
}

export const connectDatabase = async() =>{
    if(mongoose?.connection?.readyState >= 1){
        return;
    }

    try{
        await mongoose.connect(MONGODB_URL, {dbName:"virile_stream_db"})
        console.log("Database connected");
    }
    catch(err: any){
        console.log(`Mongodb connection error: ${err?.message}`)

    }
} 