const fs = require("fs");

class ProductManager{

    constructor(filePath){
        this.filePath = filePath;
        this.lastId = 0; 
    };

    async addProduct(title, description, price, thumbnail, code, stock) {
    try {
        //Lee el archivo
        const archive = await fs.promises.readFile(this.filePath,"utf-8")
        this.lastId++; //Incrementa el último ID
        const newProduct = {
            id: this.lastId,//Asigna el último ID a este producto
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        const productsJson = JSON.parse(archive)
        productsJson.push(newProduct);
        //Sobrescribe el archivo con los productos actualizados
        await fs.promises.writeFile(this.filePath, JSON.stringify(productsJson,null,"\t"))
    } catch (error) {
        console.log(error.message);
        throw error;
    }
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

    async function operationsProductManager() {
    try {
        const productManager = new ProductManager("./products.json");
        // await productManager.addProduct("¡Socorro! de Elsa Bornemann","Doce cuentos de miedo.",1500,"https://www.loqueleo.com/ar/uploads/2015/11/resized/800_9789504644163.jpg",87,200);
        // await productManager.addProduct("El libro de los chicos enamorados de Elsa Bornemann","Poemas que cantan o lloran las distintas sensaciones que produce el amor-niño",1500,"https://www.loqueleo.com/ar/uploads/2015/11/resized/800_9789504640547.jpg",27,2018);
        
        await productManager.getProducts();
        console.log("Lista de productos:");

        const productById = await productManager.getProductById(2);
        console.log("Producto con ID 2:", productById);

        await productManager.updateProduct(1, {price: 2500}); 

        // await productManager.deleteProduct(2);
        // console.log("Producto eliminado");
    } catch (error) {
        console.log("Error:", error.message);
    }
}
operationsProductManager();
