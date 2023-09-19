import { ProductManager } from "../managers/ProductManager.js";
import { __dirname } from "../utils.js"
import { CartManager } from "../managers/CartManager.js";
import path from "path";

export const productManager = new ProductManager(path.join(__dirname,"/files/products.json"));
export const cartManager = new CartManager(path.join(__dirname,"/files/carts.json"));