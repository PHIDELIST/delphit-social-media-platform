import {register,login } from '../controllers/authController.js'
import { getMessages, storeMessage } from '../controllers/messageController.js'
import { createPost, getAllPosts } from '../controllers/postController.js'

const delphitsocialRoutes = (app) => {
    app.route('/auth/register')
        .post(register)
    app.route('/auth/login')
        .post(login)
    app.route('/posts')
        .post(createPost)
        .get(getAllPosts)
    app.route('/messages')
        .post(storeMessage)
        .get(getMessages)

}

export default delphitsocialRoutes;