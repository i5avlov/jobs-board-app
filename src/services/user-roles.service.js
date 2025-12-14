const UserRole = require('../models/UserRole'); 

module.exports = { 
    assignUserRole: async (userId, roleId) => { 
        const userHasRoles = null !== await UserRole.exists({ user: userId }); 
        if (!userHasRoles) { 
            await UserRole.create({
                user: userId 
            }); 
        } 

        return UserRole.updateOne(
            { user: userId }, { $push: { roles: roleId } }
        ); 
    }, 

}; 