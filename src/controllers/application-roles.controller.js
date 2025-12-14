const applicationRolesController = require('express').Router(); 
const applicationRolesService = require('../services/application-roles.service'); 
const errorUtils = require('../utils/error.utils');
const applicationRoleValidation = require('../validation/application-role.validation'); 

applicationRolesController 
    .get('/index', async (req, res) => { 
        const applicationRolesData = await applicationRolesService.getAll(); 
        res.render('application-roles/index', { applicationRolesData }); 
    }); 

applicationRolesController 
    .get('/create', (req, res) => { 
        res.render('application-roles/create'); 
    })
    .post('/create', applicationRoleValidation.runValidations(), async (req, res) => { 
        // Get validation result 
        const validationErrors = applicationRoleValidation.getValidationResult(req); 
        // Get role data 
        const applicationRoleData = req.body; 

        try { 
            if (false === validationErrors.isEmpty()) { 
                throw validationErrors; 
            } 

            await applicationRolesService.create(applicationRoleData); 
            res.redirect('/application-roles/index'); 
        } catch (err) { 
            res.render('application-roles/create', { applicationRoleData, errors: errorUtils.normalize(err) }); 
        }
    }); 

module.exports = applicationRolesController; 
