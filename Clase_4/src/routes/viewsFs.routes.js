import { Router } from "express";
import { productManager } from "../dao/index.js";

const router = Router();

router.get("/", async(req,res)=>{
    const products = await productManager.getProducts(); 
    console.log("products",products)
    //Renderiza la vista "home" y pasa la lista de productos como datos a la vista
    res.render("home",{products});
})

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTimeProducts");
})

export {router as viewsFsRouter};