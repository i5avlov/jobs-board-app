const authController = require('express').Router(); 
const authService = require('../services/auth.service');
const errorUtils = require('../utils/error.utils'); 
const registerValidation = require('../validation/register.validation'); 
const loginValidation = require('../validation/login.validation'); 
const { JWT } = require('../constants/security');

authController
    .get('/register', (req, res) => {
        res.render('auth/register'); 
    }) 
    .post('/register', registerValidation.runValidations(), async (req, res) => { 
        // Get validation result 
        const validationErrors = registerValidation.getValidationResult(req); 
        // Get register data 
        const registerData = req.body; 

        try { 
            if (false === validationErrors.isEmpty()) { 
                throw validationErrors; 
            } 

            // Generate token if register is successful 
            const authToken = await authService.register(validationErrors, registerData); 
            // Set token in cookie 
            res.cookie(JWT.COOKIE_NAME, authToken); 

            res.redirect('/'); 
        } catch (err) { 
            res.render('auth/register', { registerData, errors: errorUtils.normalize(err) }); 
        }
        
    }); 

authController
    .get('/login', (req, res) => {
        res.render('auth/login'); 
    }) 
    .post('/login', loginValidation.runValidations(), async (req, res) => { 
        // Get validation result 
        const validationErrors = loginValidation.getValidationResult(req); 
        // Get login data 
        const loginData = req.body; 

        try { 
            if (false === validationErrors.isEmpty()) { 
                throw validationErrors; 
            } 

            // Generate token if login is successful 
            const authToken = await authService.login(loginData); 
            // Set token in cookie  
            res.cookie(JWT.COOKIE_NAME, authToken); 
            
            res.redirect('/'); 
        } catch (err) { 
            res.render('auth/login', { loginData, errors: errorUtils.normalize(err) }); 
        }
        
    }); 

authController
    .get('/logout', (req, res) => {
        res.clearCookie(JWT.COOKIE_NAME); 
        res.redirect('/'); 
    }); 

module.exports = authController; 
