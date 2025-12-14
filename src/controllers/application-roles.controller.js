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

applicationRolesController 
    .get('/:applicationRoleId/update', async (req, res) => { 
        const applicationRoleId = req.params.applicationRoleId; 
        const applicationRoleData = await applicationRolesService.getUpdate(applicationRoleId); 

        res.render('application-roles/update', { applicationRoleData }); 
    })
    .post('/:applicationRoleId/update', applicationRoleValidation.runValidations(), async (req, res) => { 
        // Get validation result 
        const validationErrors = applicationRoleValidation.getValidationResult(req); 
        // Get role data 
        const applicationRoleUpdateData = req.body;

        try { 
            if (false === validationErrors.isEmpty()) { 
                throw validationErrors; 
            } 

            // Get role id from request 
            const applicationRoleId = req.params.applicationRoleId; 
            await applicationRolesService.update(applicationRoleId, applicationRoleUpdateData); 

            res.redirect('/application-roles/index'); 
        } catch (err) { 
            res.render('application-roles/update', { applicationRoleUpdateData, errors: errorUtils.normalize(err) }); 
        }
    }); 

module.exports = applicationRolesController; 
