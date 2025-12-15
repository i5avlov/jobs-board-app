const authController = require('express').Router(); 
const authService = require('../services/auth.service');
const errorUtils = require('../utils/error.utils'); 
const registerValidation = require('../validation/register.validation'); 
const loginValidation = require('../validation/login.validation'); 
const APPLICATION_ROLES = require('../constants/application-roles.constants'); 
const userUtils = require('../utils/user.utils'); 
const { JWT } = require('../constants/security'); 
const applicationRolesUtils = require('../utils/application-roles.utils'); 

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

            // Register user and get user data if register is successful
            const user = await authService.register(registerData); 

            // Assign user the role of user
            applicationRolesUtils.putUserInRole(user._id, APPLICATION_ROLES.USER); 

            // Generate auth token 
            const authToken = userUtils.generateAuthToken(user); 
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

            // Log user in and get user data if login is successful 
            const user = await authService.login(loginData); 
            
            // Generate auth token 
            const authToken = userUtils.generateAuthToken(user); 
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
