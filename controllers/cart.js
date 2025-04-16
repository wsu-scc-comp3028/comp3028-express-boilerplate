import { getProduct } from '../middleware/productService.js';

export async function add(req, res, next) {
    const {id, qty = 1} = req.params;
    if(!id) {
        return res.status(200).render('cart', { cart: req.cart.items, message: 'No Product Provided' });
    }
    try {
        await req.cart.addToCart(id, qty, getProduct);
        res.status(200).render('cart', { cart: req.cart.items, message: 'Product added to cart' });
    } catch(err) {
        res.status(500).render('cart', {cart: [], message: err.message});
    }
}