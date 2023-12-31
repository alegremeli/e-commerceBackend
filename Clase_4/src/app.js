import express from "express";
import { __dirname } from "./utils.js";
import path from"path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { connectDB } from "./config/dbConnection.js";
import { productManager } from "./dao/index.js";
import { productsFsRouter } from "./routes/productsFs.routes.js";
import { cartsFsRouter } from "./routes/cartsFs.routes.js";
import { viewsFsRouter}  from "./routes/viewsFs.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { chatService } from "./dao/index.js";

const port = 8080;
const app = express();

//Middleware
app.use(express.static(path.join(__dirname,"/public")));

const httpServer = app.listen(port,()=>console.log(`El servidor se está ejecutando correctamente en el puerto ${port}`));

//Configuración de Websocket
const io = new Server(httpServer);

//Conexión con MongoDB Atlas
connectDB();

//Configuración de Handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//Configuración de Routes
app.use(express.json());
// app.use("/api/products", productsFsRouter);
// app.use("/api/carts", cartsFsRouter);
// app.use(viewsFsRouter);

//Configuración de Routes con MongoDB
app.use("/api/products", productsRouter); 

//Socket server
//Recibe la conexión del cliente
io.on("connection", async(socket)=>{
    console.log("Cliente conectado");
    const products = await productManager.getProducts();
    socket.emit("productsArray", products);

    //Recibe el producto desde el formulario, socket del cliente 
    socket.on("addProduct", async(productData)=>{
    await productManager.addProduct(productData);
    await productManager.getProducts();
    //Envio esta información a TODOS los clientes conectados.
    io.emit("productsArray", products); 
    });

    //Recibe el ID del producto, y luego lo elimina.
    socket.on("deleteProduct", async(id)=>{
        const pid = parseInt(id);
        console.log("productId", pid);
        await productManager.deleteProduct(pid);
        await productManager.getProducts();
        io.emit("productsArray", products);
    })
});