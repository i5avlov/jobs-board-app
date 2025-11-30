const Ad = require('../models/Ad'); 
const AdApplication = require('../models/AdApplication');

module.exports = { 
    getAll: () => {
        return Ad
            .find({})
            .lean(); 
    }, 

    create: (adData, representativeId) => { 
        const { title, description } = adData; 

        return Ad.create({
            title: title, 
            description: description, 
            createdBy: representativeId, 
            createdAt: Date.now(), 
            updatedAt: Date.now() 
        }); 

    }, 

    details: (adId) => { 
        return Ad
            .findById(adId)
            .select('_id title description')
            .lean(); 
    }, 

    apply: (adId, userId) => { 
        return AdApplication.create({
            ad: adId, 
            user: userId, 
            addedAt: Date.now(), 
        }); 
    }, 

    getAdsByRepresentativeId: (representativeId) => { 
        return Ad
            .find({ createdBy: representativeId })
            .select('_id title description')
            .lean(); 

    }
}; 