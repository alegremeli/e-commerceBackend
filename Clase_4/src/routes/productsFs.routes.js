import { Router } from "express";
import { productManager } from "../dao/index.js";

const router = Router();

//Ruta para obtener todos los productos con un límite opcional
router.get("/", async (req,res)=>{
    try {
    //Obtiene el límite de resultados desde el query param
        const limit = parseInt(req.query.limit); 
        const products = await productManager.getProducts();
    //Si hay un límite que sea valido, devuelve los productos indicados
        if (!isNaN(limit) && limit > 0) { 
            res.send(products.slice(0, limit));
        } else {
    //Si no se escribe ningun límite o el número no coincide, devuelve todos los productos
            res.send(products);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Ruta para obtener un producto por su ID
router.get("/:pid", async (req, res) => {
    try {
    //Obtiene el ID del producto desde los params
        const productId = parseInt(req.params.pid); 
        const products = await productManager.getProductById(productId);
        res.send(products);
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error, el producto no existe." });
    }
});

// Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {
    try {
        const product = req.body; //Obtiene todos los datos del producto del cuerpo de la solicitud
        //Llama al ProductManager para que se cree el nuevo producto
        await productManager.addProduct(product);
        res.status(201).json({ message: "El producto se ha agregado correctamente." });
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error al agregar el producto." });
    }
});

// Ruta para actualizar un producto por su ID
router.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const update = req.body;
        //Llama al método de ProductManager para actualizar el producto
        await productManager.updateProduct(productId, update);
        res.status(200).json({ message: "El producto se ha actualizado correctamente." });
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error al actualizar el producto." });
    }
});

// Ruta para eliminar un producto por su ID
router.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        //Llama al método de ProductManager para eliminar el producto
        await productManager.deleteProduct(productId);
        res.status(200).json({ message: "El producto se ha eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error al eliminar el producto." });
    }
});

export { router as productsFsRouter };