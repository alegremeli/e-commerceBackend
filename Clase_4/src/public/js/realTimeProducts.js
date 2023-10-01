const socketClient = io();

//Obtiene los elementos del DOM
const productList = document.getElementById("productList");
const createProductForm = document.getElementById("createProductForm");

//Escucha el evento de envío del formulario para crear productos
createProductForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    //Obtiene los datos del formulario en un objeto JSON
    const formData = new FormData(createProductForm);
    const jsonForm = {};
    for(const [key, value] of formData.entries()){
        jsonForm[key] = value;
    };
    jsonForm.price = parseInt(jsonForm.price);
    console.log(jsonForm);
    //Envia los datos del producto al servidor a través de WebSocket
    socketClient.emit("addProduct", jsonForm);
    createProductForm.reset();
});

//Escucha el evento "productsArray" que envía el servidor
socketClient.on("productsArray", (dataProducts)=>{
    console.log(dataProducts);
    let products = "";
    dataProducts.forEach(product => {
    products += 
    `<li>
    <p>Nombre: ${product.title} Precio: $${product.price}</p> <button onclick=deleteProduct(${product.id})>Eliminar</button>
    </li>`
    });
    //Muestra la lista de productos en el elemento productList del DOM
    productList.innerHTML = products;
});

//Función para eliminar un producto
const deleteProduct = (productId)=>{
    socketClient.emit("deleteProduct", productId);
    console.log(productId)
};