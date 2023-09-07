import express from "express";
import ProductManager from "./ProductManager.js";

const port = 8080;

const app = express();

app.listen(port,()=>console.log("Servidor funcionando correctamente"))

const productManager = new ProductManager("./src/products.json");

//Endpoint para obtener todos los productos con cierto límite 
app.get("/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit); //Obtiene el límite de resultados desde el query param
        const products = await productManager.getProducts();
        if (!isNaN(limit) && limit > 0) { //Si hay un límite que sea valido, devuelve los productos indicados
            res.send(products.slice(0, limit));
        } else {
            //Si no se escribe ningun límite o el número no coincide, devuelve todos los productos
            res.send(products);
        }
    } catch (error) {
        res.send(error.message);
    }
});

//Endpoint para obtener un producto por su ID
app.get("/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid); //Obtiene el ID del producto desde los params
        const products = await productManager.getProductById(productId);
        res.send(products);
    } catch (error) {
        res.send(error.message);
    }
});