import * as express from 'express';

const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use('/', express.static('public'));

io.on('connection', (client: any) => {
    client.emit('init', { data: 'hello world' });

    console.log(`A user connected: ${client.name}`);

    client.on('disconnect', () => console.log('user disconnected.'));
});

http.listen(port, () => console.log(`Server is on, port ${port}.`));
