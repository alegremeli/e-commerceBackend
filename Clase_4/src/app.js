import express from "express";
import { productManager } from "./managers/index.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const port = 8080;

const app = express();

app.listen(port,()=>console.log("Servidor funcionando correctamente"))

app.use(express.json());
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);