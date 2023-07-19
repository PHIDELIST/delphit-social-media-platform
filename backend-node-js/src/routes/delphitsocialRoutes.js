import { getChats, storeMessage } from '../controllers/messageController.js'
import { createPost, getAllPosts } from '../controllers/postController.js'
import {updateLikes} from '../controllers/likesController.js'
import {updateRepost} from '../controllers/repostController.js'
import {createComment,getCommentsByPostID } from '../controllers/commentsController.js'
import {getUsers,followUser} from '../controllers/usersController.js'
import {getFriends,deleteFriendship} from '../controllers/friendsController.js'
import {authorizeMiddleware} from '../middlewares/authorizeMiddleware.js'
import { updateprofile,getbio} from '../controllers/profileController.js'
import {getPostsTrends} from '../controllers/trendsController.js'
const delphitsocialRoutes = (app) => {
    app.route('/updateprofile')
        .post(authorizeMiddleware,updateprofile)
        .get(authorizeMiddleware,getbio)

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
        .get(authorizeMiddleware,getCommentsByPostID )

    app.route('/users')
        .get(getUsers)
        
    app.route('/follow/:userID')
        .post(authorizeMiddleware,followUser)
    app.route('/friends')
        .get(authorizeMiddleware,getFriends)
        
    app.route('/unfollow/:friendship_id')
        .delete(deleteFriendship)
    app.route('/trends')
        .get(getPostsTrends)
    
      
}

export default delphitsocialRoutes;