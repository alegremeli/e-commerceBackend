class ProductManager{
    constructor(){
        this.products = []
    };

    addProduct(id,title,description,price,thumbnail,code,stock){ //Método que agrega un producto
        if(!title || !description || !price || !thumbnail || !code || !stock ){ 
            console.log("Todos los campos son requeridos")
        }else{
            if (this.products.find(elm => elm.code === code)) {  // Verifico si el código ya existe en algún producto
            console.log("El código ya existe");
            }else{
                const newProduct = { //Creo el nuevo producto
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                    };
                this.products.push(newProduct); //Lo agrego al array de productos
            }
        }
    }    

    getProducts(){ //Método que muestra los productos 
        console.log(this.products) 
    }

    getProductById(id){ //Método que verifica si el ID existe
        if (this.products.find(elm => elm.id === id)) {
            console.log("El ID ya existe")
        }else{
            console.log("El ID no se ha encontrado")
        }
}
}

const product1 = new ProductManager()
product1.addProduct(1,"¡Socorro! de Elsa Bornemann","Doce cuentos de miedo.",1500,"https://www.loqueleo.com/ar/uploads/2015/11/resized/800_9789504644163.jpg",87,200)
//product1.getProducts()
product1.addProduct(2,"El libro de los chicos enamorados de Elsa Bornemann","Poemas que cantan o lloran las distintas sensaciones que produce el amor-niño",1500,"https://www.loqueleo.com/ar/uploads/2015/11/resized/800_9789504640547.jpg",27,2018)
product1.getProducts()
product1.getProductById(73)