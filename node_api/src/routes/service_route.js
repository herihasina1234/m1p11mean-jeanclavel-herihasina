const service_controller = require('../controllers/service_controller');

module.exports = (app) => {
    app.get('/services/search', service_controller.search)    
    // app.get('/service', service_controller.service_list)
    app.get('/services', service_controller.find)    
    app.get('/services/:id', service_controller.findById)    
    // app.get('/service/:id', service_controller.get_service_by_id)
    
    app.post('/services', service_controller.save) 
    app.post('/service', service_controller.registre_service)   
}
