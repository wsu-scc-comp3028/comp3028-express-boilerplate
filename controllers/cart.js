import { getProduct } from '../middleware/productService.js';

export async function add(req, res, next) {
    console.log("Cart controller add function called.");
    const {id, qty = 1} = req.params;
    console.log("  ID:", id, "Qty:", qty);
    if(!id) {
        console.log("  No ID provided. Rendering cart with empty cart.");
        return res.status(200).render('cart', { cart: req.cart.items, message: 'No Product Provided' });
    }
    try {
        console.log("  Calling req.cart.addToCart...");
        await req.cart.addToCart(id, qty, getProduct);
        console.log("  Product added. Rendering cart.");
        res.status(200).render('cart', { cart: req.cart.items, message: 'Product added to cart' });
    } catch(err) {
        console.error("  Error adding to cart:", err);
        res.status(500).render('cart', {cart: [], message: err.message});
    }
}