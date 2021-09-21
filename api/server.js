const express = require('express');
const { State } = require('./state');
const { FrameRate } = require('./consts/server-config.const');

const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use('/', express.static('public'));

http.listen(port, () => console.log(`Server is on, port ${port}.`));

const state = State.getInstance();
state.iniState();

io.on('connection', (client) => {
    let interval;

    client.on('playerInit', (name) => {
        state.addPlayer(client.id, name);

        client.emit('playerAdded');

        interval = setInterval(() => {

            if (!!state.getPlayerById(client.id)) {
                state.updatePlayerPosition(client.id);
                client.emit('gameState', JSON.stringify(state.getStateForPlayer(client.id)));
            }

        }, 1000 / FrameRate);

    });

    client.on('velocityChange', (velocity) => {
        state.setPlayerVelocity(client.id, velocity);
    });

    client.on('disconnect', () => {
        state.removePlayer(client.id);
        clearInterval(interval);
        interval = null;
    });
});
