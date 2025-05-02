// Really, this file should be in a seperate directory, ie. services/productService.js
// for simplicity, I have it in the same directory as the middleware
export async function getProduct(id) {
    // Logic to get the product details from the DB
    const products = [
        {id: 1, name: 'Product', price: 10},
        {id: 1, name: 'Product', price: 20},
        {id: 1, name: 'Product', price: 30}
    ];
    return products.find(product => product.id === id);
}

