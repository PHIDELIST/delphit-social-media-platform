import express from 'express';
import config from './src/db/config.js';
import delphitsocialRoutes from './src/routes/delphitsocialRoutes.js';
import jwt from 'jsonwebtoken'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
const app = express();


app.use(express.json());
//middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app)
//JWT middleware
app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if(err) req.user = undefined;
            req.user = decode;
            next();
        })
    }else{
        req.user = undefined;
        next();
    }});

//ROUTES
delphitsocialRoutes(app);
app.get('/', (req, res) => {
    res.send('Hello World!');

});
const io = new Server(server,{
    cors: {
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
});
///socket io implementations
///chats socket io implementation
io.on("connection", (socket) => {
    console.log(`user connected:${socket.id}`);

    //join room
    socket.on("join_room",(data) => {
        socket.join(data);
        console.log(`user id ${socket.id} joined`);
    });

    //send message
    socket.on("send_message" , (data) =>{
        socket.to(data.room).emit("receive_message",data);
        console.log(data);
    });

    //leave room
    socket.on('leave_room',(data) =>{
        socket.leave(data);
        
        //console.log(`user with id :${socket.id} left room:${data}`);
    });

});




server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);

});