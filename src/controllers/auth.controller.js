const authService = require('../services/auth.service');

const authController = require('express').Router(); 

authController
    .get('/register', (req, res) => {
        res.render('auth/register'); 
    }) 
    .post('/register', async (req, res) => { 
        const registerData = req.body; 

        try { 
            const user = await authService.register(registerData); 
            res.redirect('/'); 
        } catch (err) { 
            res.render('auth/register', { registerData, errors: err.errors }); 
        }
        
    }); 

authController
    .get('/login', (req, res) => {
        res.render('auth/login'); 
    }) 
    .post('/login', async (req, res) => { 
        const loginData = req.body; 

        try { 
            const user = await authService.login(loginData); 
            res.redirect('/'); 
        } catch (err) { 
            res.render('auth/login', { loginData, errors: err.errors }); 
        }
        
    }); 

module.exports = authController; 
