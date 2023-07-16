import { getChats, storeMessage } from '../controllers/messageController.js'
import { createPost, getAllPosts } from '../controllers/postController.js'
import {updateLikes} from '../controllers/likesController.js'
import {updateRepost} from '../controllers/repostController.js'
import {createComment} from '../controllers/commentsController.js'
import {getUsers,followUser} from '../controllers/usersController.js'
import {getFriends,deleteFriendship} from '../controllers/friendsController.js'
import {authorizeMiddleware} from '../middlewares/authorizeMiddleware.js'
const delphitsocialRoutes = (app) => {
    app.route('/posts')
        .post(authorizeMiddleware,createPost)
        .get(authorizeMiddleware,getAllPosts)
    app.route('/messages')
        .post(storeMessage)
        .get(authorizeMiddleware,getChats)
    app.route('/likesupdate/:postId')
        .post(updateLikes);
    app.route('/reposts/:postId')
        .post(updateRepost)
    app.route('/comments/:postId')
        .post(authorizeMiddleware,createComment)

    app.route('/users')
        .get(getUsers)
        
    app.route('/follow/:userID')
        .post(authorizeMiddleware,followUser)
    app.route('/friends')
        .get(authorizeMiddleware,getFriends)
        
    app.route('/unfollow/:friendship_id')
        .delete(deleteFriendship)
    // app.route('/unfollow/:userId')
    //     .post(loginrequired,followUser)
    // app.route('/profile/:userId')
    //     .get(loginrequired,getUsers)')
      
}

export default delphitsocialRoutes;