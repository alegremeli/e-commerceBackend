import { productsModel } from "../models/products.model.js";

export class ProductsManagerMongo{

    constructor(){
        this.model = productsModel;
    };

    async getProducts() {
        try {
            //Busca todos los productos en la base de datos y los devuelve
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            console.log("getProducts", error.message);
            throw new Error ("No se ha podido obtener el listado de productos.");
        }
    };

    async addProduct(productInfo){
        try {
            //Crea un nuevo producto en la base de datos utilizando la información proporcionada
            const result = await this.model.create(productInfo);
            return result;
        } catch (error) {
            console.log("addProduct", error.message);
            throw new Error("No se ha podido crear el producto.");
        }
    };

    async getPtoductById(productId) {
        try {
            // Busca un producto por su ID en la base de datos
            const result = await this.model.findById(productId);
            if (!result) {
                throw new Error("No se ha podido encontrar el producto con el ID indicado.");
            }
            return result;
        } catch (error) {
            console.log("getPtoductById", error.message);
            throw new Error("No se pudo obtener el producto.");
        }
    };

    async updateProduct(productId, updateProductInfo) {
        try {
            //Actualiza un producto en la base de datos por su ID con la información proporcionada
            const result = await this.model.findByIdAndUpdate(productId, updateProductInfo, {new: true});
            if (!result) {
                throw new Error("No se pudo encontrar el producto con el ID indicado.");
            }
            return result;
        } catch (error) {
            console.log("updateProduct", error.message);
            throw new Error("No se pudo actualizar el producto.");
        }
    };

    async deleteProduct(productId){
        try {
            //Elimina un producto en la base de datos por su ID
            const result = await this.model.findByIdAndDelete(productId);
            if(!result){
                throw new Error("No se ha podido encontrar el producto a eliminar.");
            }
            return result;
        } catch (error) {
            console.log("deleteProduct",error.message);
            throw new Error("No se ha podido eliminar el producto.");
        }
    };
};