const authService = require('../services/auth.service');
const errorUtils = require('../utils/error.utils');

const authController = require('express').Router(); 

authController
    .get('/register', (req, res) => {
        res.render('auth/register'); 
    }) 
    .post('/register', async (req, res) => { 
        const registerData = req.body; 

        try { 
            const authToken = await authService.register(registerData); 
            res.cookie('user', authToken); 
            res.redirect('/'); 
        } catch (err) { 
            res.render('auth/register', { registerData, errors: errorUtils.normalize(err) }); 
        }
        
    }); 

authController
    .get('/login', (req, res) => {
        res.render('auth/login'); 
    }) 
    .post('/login', async (req, res) => { 
        const loginData = req.body; 

        try { 
            const authToken = await authService.login(loginData); 
            res.cookie('user', authToken); 
            res.redirect('/'); 
        } catch (err) { 
            res.render('auth/login', { loginData, errors: errorUtils.normalize(err) }); 
        }
        
    }); 

authController
    .get('/logout', (req, res) => {
        res.clearCookie('user'); 
        res.redirect('/'); 
    }); 

module.exports = authController; 
