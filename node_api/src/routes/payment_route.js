const payment_controller = require('../controllers/payment_controller');

module.exports = (app) => {
    app.get('/payments', payment_controller.find)    
    app.post('/payments', payment_controller.save)    
}
