import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://alegremeli:jdLUL5mDWB5p4uIL@ecommerce.rlsezsk.mongodb.net/?retryWrites=true&w=majority');
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(`Hubo un error conectando la base de datos: ${error.message}`);
    }
};