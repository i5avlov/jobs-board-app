const jwt = require('jsonwebtoken'); 
const { JWT } = require('../constants/security');

module.exports = { 
    auth: () => { 
        return (req, res, next) => { 
            const token = req.cookies[JWT.COOKIE_NAME]; 

            // No auth cookie, user is not logged in 
            if (!token) { 
                return next(); 
            } 
            
            // Auth cookie 
            try { 
                // Token is valid
                const user = jwt.verify(token, JWT.SECRET); 

                req.user = user; 
                res.locals.user = user; 

                next(); 
            } catch (e) { 
                // Token is not valid 
                res.clearCookie(JWT.COOKIE_NAME); 
                res.redirect('/auth/login'); 
            }
        }; 
    }
}; 
