import express from 'express';
import config from './src/db/config.js';
import delphitsocialRoutes from './src/routes/delphitsocialRoutes.js';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import { sendNotifications } from './src/controllers/notificationsController.js';

const app = express();

app.use(express.json());
//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = http.createServer(app);

//ROUTES
delphitsocialRoutes(app);
app.get('/', (req, res) => {
  res.send('Hello delphit!');
});

const io = new Server(server, {
  cors: {
    origin: 'https://globalphidelist.tech',
    methods: ['GET', 'POST'],
  },
});

///socket io implementations
///chats socket io implementation
io.on('connection', (socket) => {
  console.log(`user connected:${socket.id}`);

  //join room
  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user id ${socket.id} joined`);
  });

  //send message
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
    console.log(data);

    // Create a new notification when a message is sent
    sendNotifications(data.author, `You have a new message from ${data.author}`, data.room);

  });

  //leave room
  socket.on('leave_room', (data) => {
    socket.leave(data);

  });
});

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
