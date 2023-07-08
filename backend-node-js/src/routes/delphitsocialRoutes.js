import {register,login } from '../controllers/authController.js'

const delphitsocialRoutes = (app) => {
    app.route('/auth/register')
        .post(register)
    app.route('/auth/login')
        .post(login)
}

export default delphitsocialRoutes;