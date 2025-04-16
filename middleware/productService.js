// Really, this file should be in a seperate directory, ie. services/productService.js
// for simplicity, I have it in the same directory as the middleware
export async function getProduct(id) {
    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 }
    ];
    const foundProduct = products.find(product => product.id === Number(id));
    return foundProduct;
}


