//This middleware function, cartMiddleware, 
// is used in an Express.js application to manage 
// the shopping cart session for a user.

export function cartMiddleware(req, res, next) {
    if(!req.session.cart) {
        req.session.cart = [];
    } 
    req.cart = new CartService(req.session.cart);
    next();
}

export class CartService {
    constructor(cart) {
        this.items = cart;
    }
    async addToCart(id, quantity, getProduct) {
        const inCart = this.items.find(item => item.id === Number(id));
        if(inCart) {
            inCart.qty += Number(quantity);
        } else {
            try {
                const product = await getProduct(id);
                if(product) {
                    product.qty = Number(quantity);
                    this.items.push(product);
                } else {
                    throw new Error('Product not found');
                }
            } catch (error) {
                throw error;
            }
        }
    }
}