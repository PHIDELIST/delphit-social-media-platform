import {register,login } from '../controllers/authController.js'
import { createPost } from '../controllers/postController.js'

const delphitsocialRoutes = (app) => {
    app.route('/auth/register')
        .post(register)
    app.route('/auth/login')
        .post(login)
    app.route('/post/postcreation')
        .post(createPost)
}

export default delphitsocialRoutes;