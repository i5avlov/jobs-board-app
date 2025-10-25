const LeadRepresentative = require('../models/LeadRepresentative'); 

module.exports = {
    add: (companyRepresentativeId) => { 
        return LeadRepresentative.create({
            companyRepresentative: companyRepresentativeId 
        }); 
    }, 

}; 
