import jwt from 'jsonwebtoken';

// export default function authorise(roles) {
//     return async function(req, res, next) {
//         if(!req.session.user || !roles.includes(req.session.user.role)) {
//             return res.redirect(302, '/login');
//     }
//         next();
//     }
// }

export default function authorise(roles) {
    return async function(req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        return res.redirect(302, '/loginjwt');
    }
    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        if(roles.includes(user.role)) {
        req.user = user;
        return next();
        } 
    }
    catch (err) {
        console.error('Token invalid:' + err.message);
    }
        return res.redirect(302, '/loginjwt');
    }
}


