import { Router } from "express";
import { cartManager } from "../managers/index.js";

const router = Router();

// Ruta para crear un nuevo carrito 
router.post("/", async (req, res) => {
    try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ newCart });
    } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al crear el carrito." });
    }
});

// Ruta para listar los productos de un carrito específico 
router.get("/:cid", async (req, res) => {
    try {
    //Obtiene el ID del carrito desde los params
    const cartId = req.params.cid;
    const carts = await cartManager.getCarts();
    //Busca el carrito con el ID correspondiente
    const cart = carts.find(elm => elm.id === parseInt(cartId));
    if (cart) {
        res.status(200).json({ products: cart.products });
    } else {
        res.status(404).json({ error: "El carrito no existe." });
    }
    } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al obtener los productos del carrito." });
    }
});

// Ruta para agregar un producto a un carrito específico, mediante su ID
router.post("/:cid/product/:pid", async (req, res) => {
    try {
    //Obtiene el ID del producto desde los params
    const cartId = req.params.cid;
    // Obtiene la cantidad del producto desde el cuerpo de la solicitud
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity);
    // Verifica si la cantidad es válida
    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: "La cantidad debe ser un número mayor que cero." });
    }
    // Llama a cartManager para agregar el producto al carrito
    await cartManager.addToCart(cartId, productId, quantity);
    res.status(201).json({ message: "El producto fue agregado al carrito correctamente." });
    } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito." });
    }
});


export { router as cartsRouter };

