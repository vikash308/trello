require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');

const tasksRouter = require('./routes/tasks');
const boardsRouter = require('./routes/boards');
const tc = require('./trelloClient');

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL, // React frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Trello realtime backend'));


app.post('/trello/webhook', (req, res) => {
   
    const event = req.body;
    const io = req.app.get('io');
    io.emit('trello:event', event);
    res.status(200).send('OK');
});



// mount APIs
app.use('/api/tasks', tasksRouter);
app.use('/api/boards', boardsRouter);

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});
app.set('io', io);

io.on('connection', socket => {
    console.log('client connected', socket.id);
    socket.on('ping', v => socket.emit('pong', v));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
