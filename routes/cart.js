import express from 'express';
import * as cart from '../controllers/cart.js';
import {cartMiddleware} from '../middleware/cartMiddleware.js';

const cartRouter = express.Router()
export default cartRouter;

//cartRouter.get('/add/:id?/:qty?', cartMiddleware, cart.add);
cartRouter.get('/add/:id?/:qty?', cartMiddleware, (req, res, next) => {
    next();
}, cart.add);