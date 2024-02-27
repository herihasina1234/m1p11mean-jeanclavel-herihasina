const user_controller = require('../controllers/user_controller');
const authentication = require('../middleware/authentication');

module.exports = (app) => {
    app.post('/login', user_controller.login)
    app.post('/user', user_controller.save)
    app.get('/user', user_controller.find)
    app.get('/user/role=:role', user_controller.findByRole)
    app.get('/user/:id', user_controller.findById)
}
