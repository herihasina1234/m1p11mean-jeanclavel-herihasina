const Service = require('../models/service')

module.exports.find = async (req, res) => {        
    await Service.find()
        .then ( services => {    
            const response = {
                message: "service list obtained successfully",
                data: services                 
            }            
            res.status(201).json({ response: response });
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })            
            
}

module.exports.search = async (req, res) => {      
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize; //0

    let filter = Object.assign({}, req.query);
    delete filter.page;
    delete filter.pageSize;

    await Service.find(filter)
        .then ( services => {  
            let result = services
            
            const endIndex = Math.min(startIndex + pageSize - 1, result.length - 1);
            const paginatedResult = result.slice(startIndex, endIndex + 1);
            const totalPages = Math.ceil(result.length / pageSize);
            
            const queryParams = Object.keys(req.query).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(req.query[key])).join(', ');            
            message= `services list with params ${queryParams} obtained successfully`;
        
                        
            res.status(201).json({ message: message, data: paginatedResult, totalPages: totalPages });
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })            
            
}

module.exports.save = async (req, res) => {
    let { designation, description, duree, prix, commission, img } = req.body;

    await Service.create({ designation, description, duree, prix, commission, img })
        .then ( service => {                   
            const message = "service added successfully"                 
            res.status(201).json({message: message, data: service});
        })
        .catch( error => {
            res.status(400).json({message: error.message, data: error})
        })                        
}