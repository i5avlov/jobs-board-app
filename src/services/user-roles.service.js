const UserRole = require('../models/UserRole'); 

module.exports = { 
    getAll: () => { 
        return UserRole
            .find({}) 
            .populate('user', { firstName: true, lastName: true }) 
            .populate('roles', { name: true }) 
            .lean(); 
    }, 

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

    getUserRoles: async (userId) => { 
        // Getting user roles record by user id 
        const userRoles = await UserRole
            .findOne({ user: userId })
            .populate('roles', { name: true }); 

        // Getting roles names list for the user 
        const roles = userRoles.roles
            .map(ur => ur.name); 

        return roles; 
    }, 

}; 