import mongoose from "mongoose";

export async function connect () {

    try{

        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log(`Mongo DB connected successfully`)
        })

        connection.on('error', (error) => {
            console.log(`Mongo connection error - ${error}`)
            process.exit()
        })

    }catch(error){
        console.log(`DB connection Failed! - ${error}`);        
    }
}