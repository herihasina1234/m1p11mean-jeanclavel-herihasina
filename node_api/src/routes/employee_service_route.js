const employee_service_controller = require('../controllers/employee_service_controller');
const authentication = require('../middleware/authentication');

module.exports = (app) => {
    app.post('/employee-service', authentication, employee_service_controller.registre_employee_service)
    app.get('/employee-service', authentication, employee_service_controller.employee_service_list)
    app.get('/employee-service/detail/:id', authentication, employee_service_controller.find_employee_by_service)
    app.delete('/employee-service/:id', authentication, employee_service_controller.delete_employee_service)
}