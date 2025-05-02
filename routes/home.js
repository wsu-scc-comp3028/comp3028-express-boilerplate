import express from 'express';
import * as home from '../controllers/home.js';
import authorise from '../middleware/authorise.js';

export const homeRouter = express.Router()

// Below are all the routes for the home
homeRouter.get('/', home.index);
homeRouter.get('/session/:username?', home.profile);
homeRouter.get('/token', home.createToken);
homeRouter.get('/check', home.checkToken);
homeRouter.get('/login', home.login);
homeRouter.post('/login', home.login);
homeRouter.get('/loginjwt', home.loginjwt);
homeRouter.post('/loginjwt', home.loginjwt);
//homeRouter.get('/dashboard', (req, res) => res.render('dashboard'));
homeRouter.get('/dashboard', authorise(['admin']), (req, res) => res.render('dashboard'));