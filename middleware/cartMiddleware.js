export function cartMiddleware(req, res, next) {
    console.log("Cart middleware called.");
    if(!req.session.cart) {
        req.session.cart = [];
        console.log("  Cart initialized in session.");
    } else {
        console.log("  Cart already exists in session:", req.session.cart);
    }
    req.cart = new CartService(req.session.cart);
    console.log("  CartService instance created.");
    next();
}

export class CartService {
    constructor(cart) {
        this.items = cart;
        console.log("  CartService constructor. Items:", this.items);
    }
    async addToCart(id, quantity, getProduct) {
        console.log("  CartService addToCart called. ID:", id, "Qty:", quantity);
        const inCart = this.items.find(item => item.id === Number(id));
        if(inCart) {
            console.log("   Product already in cart. Updating quantity.");
            inCart.qty += Number(quantity);
        } else {
            console.log("   Product not in cart. Getting product details...");
            try {
                const product = await getProduct(id);
                if(product) {
                    console.log("    Product details:", product);
                    product.qty = Number(quantity);
                    this.items.push(product);
                    console.log("    Product added to cart. Items:", this.items);
                } else {
                    console.log("    Product not found.");
                    throw new Error('Product not found');
                }
            } catch (error) {
                console.error("   Error getting product:", error);
                throw error;
            }
        }
    }
}