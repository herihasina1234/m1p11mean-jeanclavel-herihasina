const service_controller = require('../controllers/service_controller');

module.exports = (app) => {
    app.get('/services/search', service_controller.search)    
    app.get('/services', service_controller.find)    
    app.post('/services', service_controller.save)    
}
