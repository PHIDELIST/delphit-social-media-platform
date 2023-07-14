import {register,login ,loginrequired} from '../controllers/authController.js'
import { getMessages, storeMessage } from '../controllers/messageController.js'
import { createPost, getAllPosts } from '../controllers/postController.js'
import {updateLikes} from '../controllers/likesController.js'
import {updateRepost} from '../controllers/repostController.js'
const delphitsocialRoutes = (app) => {
    app.route('/auth/register')
        .post(register)
    app.route('/auth/login')
        .post(login)
    app.route('/posts')
        .post(loginrequired,createPost)
        .get(getAllPosts)
    app.route('/messages')
        .post(storeMessage)
        .get(getMessages)
    app.route('/likesupdate/:postId')
        .post(updateLikes);
    app.route('/reposts/:postId')
        .post(updateRepost)
      
}

export default delphitsocialRoutes;