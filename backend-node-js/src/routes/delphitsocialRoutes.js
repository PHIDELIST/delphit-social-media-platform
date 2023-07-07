import {register } from '../controllers/authController.js'

const delphitsocialRoutes = (app) => {
    app.route('auth/register')
        .post(register)
}

export default delphitsocialRoutes;