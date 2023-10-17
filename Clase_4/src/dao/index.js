import { ProductManager } from "./filesystem/ProductManager.js";
import { CartManager } from "./filesystem/CartManager.js";

import { ProductsManagerMongo } from "./mongo/ProductManagerMongo.js";
import { CartsManagerMongo } from "./mongo/CartManagerMongo.js";
import { ChatManagerMongo } from "./mongo/ChatManagerMongo.js";

import { __dirname } from "../utils.js";
import path from "path";

export const productManager = new ProductManager(path.join(__dirname,"/files/products.json"));
export const cartManager = new CartManager(path.join(__dirname,"/files/carts.json"));

export const productService = new ProductsManagerMongo();
export const cartService = new CartsManagerMongo();
export const chatService = new ChatManagerMongo();