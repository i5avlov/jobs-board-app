const CompanyRepresentative = require('../models/CompanyRepresentative'); 

module.exports = {
    add: (userId, companyId) => { 
        return CompanyRepresentative.create({
            user: userId, 
            company: companyId
        }); 
    }, 

}; 
