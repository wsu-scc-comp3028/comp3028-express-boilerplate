
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
        // If the product is already in the cart
        const inCart = this.items.find(item => item.id === id);
        if(inCart) {
            inCart.qty += quantity;
        } else {
            // Logic to get the product details from the DB
            const product = await getProduct(id);
            if(product) {
                product.qty = quantity;
                this.items.push(product);
            } else {
                throw new Error('Product not found');
            }
        }
    }
}