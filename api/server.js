const express = require('express');
const { StaticState } = require('./static-state');
const { DynamicState } = require('./dynamic-state');
const { FrameRate } = require('./consts/config.const');

const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use('/', express.static('public'));

http.listen(port, () => console.log(`Server is on, port ${port}.`));

const staticState = StaticState.getInstance();
staticState.iniState();

const dynamicState = DynamicState.getInstance();
dynamicState.iniState();

io.on('connection', (client) => new PlayerHandler(client).init());

class PlayerHandler {
    interval;
    config;

    constructor(client) { this.client = client }

    init() {
        new Promise((resolve, reject) => this.client.on('playerInit', (config) => {
            this.config = config;
            this.onPlayerInit() ? resolve() : reject()
        }))
            .then(() => {
                this.client.emit('staticState', staticState.getSharedState(this.client.id));

                this.client.on('velocityChange', (velocity) => this.onVelocityChange(velocity));
                this.client.on('disconnect', () => this.onDisconnect());

                this.interval = setInterval(() => this.onGameIteration(), 1000 / FrameRate);
            })
            .catch((err) => console.log(err));
    }

    onGameIteration() {
        this.client.emit('dynamicState', dynamicState.getPersonalPlayerState(this.client.id, this.config.canvasSize));
        dynamicState.updatePlayerPosition(this.client.id);
        dynamicState.updateEnemeyPosition();
    }

    onPlayerInit() {
        dynamicState.addPlayer(this.client.id, this.config.name);
        return dynamicState.getPlayerById(this.client.id);
    }

    onVelocityChange(velocity) {
        dynamicState.setPlayerVelocity(this.client.id, velocity);
    }

    onDisconnect() {
        console.log('Player: "' + this.config.name + '" diconnected at ' + new Date())

        dynamicState.removePlayer(this.client.id);
        clearInterval(this.interval);
        this.interval = null;
    }
}