import { Router } from "express";
import { productService } from "../dao/index.js";

const router = Router();

//Ruta para obtener todos los productos
router.get("/",async(req,res)=>{
    try {
        const result = await productService.getProducts();
        res.json({status: "success", data: result});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

//Ruta para crear un nuevo producto
router.post("/", async(req,res)=>{
    try {
        //Obtiene los datos del producto desde el cuerpo de la solicitud
        const product = req.body;
        const result = await productService.addProduct(product);
        res.json({status: "success", data: result});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

//Ruta para actualizar un producto mediante su ID
router.put("/:productId", async(req,res)=>{
    try {
        //Obtiene los datos del producto desde el cuerpo de la solicitud
        const product = req.body;
        //Obtiene el ID del producto desde los parámetros de la URL
        const productId = req.params.productId;
        const result = await productService.updateProduct(productId,product);
        res.json({status: "success", data: result});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

//Ruta para eliminar un producto mediante su ID
router.delete("/:productId", async(req,res)=>{
    try {
        //Obtiene el ID del producto desde los parámetros de la URL
        const productId = req.params.productId;
        const result = await productService.deleteProduct(productId);
        res.json({status: "success", data: result});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

export { router as productsRouter};