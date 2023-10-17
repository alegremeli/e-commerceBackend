import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type: String,
        require: true,
    },
    code:{
        type: String,
        require: true,
        unique: true
    },
    price:{
        type: Number,
        require: true
    },
    status:{
        type: Boolean,
        default: true
    },
    stock:{
        type: Number,
        require: true
    },
    category:{
        type: String,
        require: true,
        enums:["Libros infantiles","Libros para jovenes adultos"]
    },
    thumbnails:{
        type: String,
    },
});

export const productsModel = mongoose.model(productsCollection, productSchema);
