import jwt from 'jsonwebtoken';
import UserService from '../services/userService.js';


/**
 * Renders the index page with the specified title.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the rendering is complete.
 */
export async function index(req, res, next) {
    res.render('home', { title: 'Express' });
}
export async function profile(req, res, next) {
    // Check if the username is provided in the URL
    if (req.params.username) {
        req.session.username = req.params.username;
    }
    // Check if the username is stored in the session
    if (!req.session.username) {
        req.session.username = 'Guest';
    }
    // Render the home page with the username from the session
	res.render('sessionpage', { username: req.session.username });
}
export async function createToken(req, res, next) {
    // mock user
    const user = {
        id: 1,
        username: 'brad', 
    };
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '2m'});
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'strict'
    });
    	res.send('Token created');
    }
    
export async function checkToken(req, res, next) {
    const token = req.cookies.token;
        try {
            if(!token) throw new Error('No Token Found');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            res.send(`Token is valid. User: ${req.user.username}`);
        } catch (err) {
            console.error(err);
            res.status(401).send('Unauthorised access');
        }
}
  
export async function login(req, res, next) {
    const {username, password} = req.body;
    if(req.method !== 'POST' || !username || !password) {
        req.session.destroy();
        return res.render('login', {message: ''});
    }
    try {
        const userService = new UserService();
        const user = await userService.validUserCredentials(username, password);
        if(user) {
          req.session.user = {id: user.id, username: user.username, role: user.role};
         res.redirect(302, '/dashboard');
        }
    } catch (err) {
        console.error(err);
        return res.render('login', {message: 'Invalid username or password'});
    }
}

export async function loginjwt(req, res, next) {
    const {username, password} = req.body;
    if(req.method !== 'POST' || !username || !password) {
        res.clearCookie('token'); // Not bullet proof, but good enough for this example
        return res.render('login', {message: ''});
    }
    try {
        const userService = new UserService();
        const user = await userService.validUserCredentials(username, password);
        if(user) {
            res.cookie('token', jwt.sign({
                id: user.id,
                username: user.username, 
                role: user.role}, 
                process.env.JWT_SECRET,
                {expiresIn: '1m'}
        ), 
            {httpOnly: true, expiresIn: '3m'});
            res.redirect(302, '/dashboard');
    }
    } catch (err) {
        console.error(err);
        return res.render('login', {message: 'Invalid username or password'});
    }
}
    
    



