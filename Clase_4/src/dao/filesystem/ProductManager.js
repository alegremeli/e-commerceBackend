import fs from "fs";

export class ProductManager{

    constructor(filePath){
        this.filePath = filePath;
    };
    
    async addProduct(product) {
    try {
        const { title, description, code, price, stock, category, thumbnails } = product;
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Faltan campos obligatorios.");
        }
        //Lee el archivo
        const archive = await fs.promises.readFile(this.filePath,"utf-8")
        const productsJson = JSON.parse(archive);
        const newId = this.uniqueId(productsJson);
        const newProduct = {
            id: newId,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: thumbnails || [],
        };
        productsJson.push(newProduct);
        //Sobrescribe el archivo con los productos actualizados
        await fs.promises.writeFile(this.filePath, JSON.stringify(productsJson,null,"\t"))
    } catch (error) {
        console.log(error.message);
        throw error;
    }
    }

    uniqueId(products) {
        //Encuentra el ID máximo actual en la lista de productos
        const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        //Genera un nuevo ID único mayor que el máximo actual
        return maxId + 1;
    }

    fileExist(){
        return fs.existsSync(this.filePath)
    }

    async getProducts(){
        try{
            if(this.fileExist()){//Verifico si el archivo existe
                //Lee el contenido del archivo
                const archive = await fs.promises.readFile(this.filePath,"utf-8")
                //Transformo el string en JSON
                const productsJson = JSON.parse(archive)
                return productsJson
            }else{
                throw new Error("No es posible leer el archivo")
            }
        }catch(error){
            console.log(error.message)
            throw error;  
        }
    }
    async getProductById(id) {
        try {
            const archive = await fs.promises.readFile(this.filePath, "utf-8");
            const productsJson = JSON.parse(archive);
            const product = productsJson.find(elm => elm.id === id);
            return product; //Devuelve el producto encontrado
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    
    async updateProduct(id, update){
        try {
            const archive = await fs.promises.readFile(this.filePath, "utf-8");
            const productsJson = JSON.parse(archive);
            //Busca el índice del producto con el ID 
            const index = productsJson.findIndex(elm => elm.id === id);
            if (index !== -1) {
                //Si se encuentra el producto, se actualizan sus propiedades 
                productsJson[index] = {
                    ...productsJson[index],//Mantiene las propiedades existentes 
                    ...update //Se reemplazan las propiedades
                };
                //Transforma el JSON a string y se sobreescribe el archivo
                await fs.promises.writeFile(this.filePath, JSON.stringify(productsJson, null, "\t"))
                console.log("archivo actualizado")
            } else {
                console.log("El ID no se ha encontrado");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            const archive = await fs.promises.readFile(this.filePath, "utf-8");
            const productsJson = JSON.parse(archive);
            //Busca el índice del producto con el ID
            const index = productsJson.findIndex(elm => elm.id === id);
            if (index !== -1) {
                //Si encuentra el producto, lo elimina de la lista usando splice
                productsJson.splice(index, 1);
                await fs.promises.writeFile(this.filePath, JSON.stringify(productsJson, null, "\t"));
                console.log("Producto eliminado");
            } else {
                console.log("El ID no se ha encontrado");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}
export default ProductManager;