import {register,login ,loginrequired} from '../controllers/authController.js'
import { getChats, storeMessage } from '../controllers/messageController.js'
import { createPost, getAllPosts } from '../controllers/postController.js'
import {updateLikes} from '../controllers/likesController.js'
import {updateRepost} from '../controllers/repostController.js'
import {createComment} from '../controllers/commentsController.js'
import {getUsers,followUser} from '../controllers/usersController.js'
import {getFriends,deleteFriendship} from '../controllers/friendsController.js'
const delphitsocialRoutes = (app) => {
    app.route('/auth/register')
        .post(register)
    app.route('/auth/login')
        .post(login)
    app.route('/posts')
        .post(loginrequired,createPost)
        .get(loginrequired,getAllPosts)
    app.route('/messages')
        .post(storeMessage)
        .get(loginrequired,getChats)
    app.route('/likesupdate/:postId')
        .post(updateLikes);
    app.route('/reposts/:postId')
        .post(updateRepost)
    app.route('/comments/:postId')
        .post(loginrequired,createComment)

    app.route('/users')
        .get(getUsers)
        
    app.route('/follow/:userID')
        .post(loginrequired,followUser)
    app.route('/friends')
        .get(loginrequired,getFriends)
        
    app.route('/unfollow/:friendship_id')
        .delete(deleteFriendship)
    // app.route('/unfollow/:userId')
    //     .post(loginrequired,followUser)
    // app.route('/profile/:userId')
    //     .get(loginrequired,getUsers)')
      
}

export default delphitsocialRoutes;