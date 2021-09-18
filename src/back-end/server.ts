import * as express from 'express';
import { State } from './state';
import { Flow } from './flow';

class Server {
    private static instance: typeof Server.prototype;

    public static getInstance(): typeof Server.prototype {
        if (!Server.instance) {
            Server.instance = new Server();
        }

        return Server.instance;
    }

    private _players = 0;

    constructor() { }

    init(): void {
        const app = express();
        const http = require('http').Server(app)
        const io = require('socket.io')(http);
        const port = process.env.PORT || 3000;

        app.use('/', express.static('public'));

        const state = State.getInstance();
        state.iniState();

        const flow = Flow.getInstance();
        flow.initGameInterval();

        http.listen(port, () => console.log(`Server is on, port ${port}.`));

        io.on('connection', onConnect);
    }

    get playerCount(): number {
        return this._players;
    }

    set playerCount(num: number) {
        this._players = num;
    }
}

const server = Server.getInstance()
server.init();

function onConnect(client: any): void {
    server.playerCount++;
    client.on('disconnect', onDisconnect);

    client.emit('connected', `player count: ${server.playerCount}`);
    
    console.log(`Player connected, current players: ${server.playerCount}`);
}

function onDisconnect(): void {
    server.playerCount--;
    console.log(`Player disconnected, players left: ${server.playerCount}`);
}