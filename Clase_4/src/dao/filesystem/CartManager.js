import fs from "fs";

export class CartManager{

    constructor (filePath){
        this.filePath = filePath;
    }

    fileExist(){
        return fs.existsSync(this.filePath);
    }

    async getCarts(){
        try{
            if(this.fileExist()){//Verifico si el archivo existe
                //Lee el contenido del archivo JSON
                const archive = await fs.promises.readFile(this.filePath,"utf-8");
                //Transformo el string en JSON
                const cartsJson = JSON.parse(archive);
                return cartsJson;
            }else{
                throw new Error("No es posible leer el archivo.");
            }
        }catch(error){
            console.log(error.message);
            throw error;  
        }
    }

    async createCart() {
        try {
            const archive = await fs.promises.readFile(this.filePath, "utf-8");
            const carts = JSON.parse(archive);
            //Genera un nuevo ID único para el carrito
            const newId = this.uniqueId(carts);
            const newCart = {
                id: newId,
                products: [],
            };
            carts.push(newCart);
            //Escribe los cambios del nuevo carrito en el archivo JSON
            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, "\t"));
            //Retorna el ID del nuevo carrito
            return newCart;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    uniqueId(carts) {
        let newId;
        if (carts.length === 0) {
        newId = 1;
        } else {
        newId = carts[carts.length - 1].id + 1;
        }
        return newId;
    }

    async addToCart(cartId, productId, quantity) {
        try {
            const archive = await fs.promises.readFile(this.filePath, "utf-8");
            const carts = JSON.parse(archive);
            const cart = carts.find((cart) => cart.id === parseInt(cartId));
            if (cart) {
                const existingProduct = cart.products.find((product) => product.id === productId);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                } else {
                    cart.products.push({ 
                        id: productId, 
                        quantity: quantity 
                    });
                }
                await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, "\t"));
            } else {
                throw new Error("El carrito no existe.");
            }
        } catch (error) {
            console.log("Error en addToCart:", error.message); 
            throw error;
        }
    }
}

export default CartManager;