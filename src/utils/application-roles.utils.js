const userRolesService = require('../services/user-roles.service');
const applicationRolesService = require('../services/application-roles.service'); 

const putUserInRole = async (userId, roleName) => {
    // Get application role id 
    const applicationRoleId = await applicationRolesService.getApplicationRoleIdByName(roleName); 
    // Assign role to user 
    await userRolesService.assignUserRole(userId, applicationRoleId); 
}; 

module.exports = {
    putUserInRole 
}; 
