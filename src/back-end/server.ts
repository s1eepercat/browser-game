import * as express from 'express';
import { State } from './state';
import { ServerConfig } from './consts/server-config.const';

const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use('/', express.static('public'));

http.listen(port, () => console.log(`Server is on, port ${port}.`));

const state = State.getInstance();
state.iniState();

io.on('connection', (client: any) => {
    let interval: any;

    client.emit('nameRequest');

    client.on('nameResponse', (name: string) => {
        state.addPlayer(client.id, name);

        interval = setInterval(() => {
            client.emit('gameState', JSON.stringify(state.getState()));
        }, 1000 / ServerConfig.FrameRate)
    });

    client.on('input', () => {
        // DO MOVEMENT CALC
    });

    client.on('disconnect', () => {
        state.removePlayer(client.id);
        clearInterval(interval);
        interval = null;
    });
});






// class Server {
//     private static instance: typeof Server.prototype;

//     public static getInstance(): typeof Server.prototype {
//         if (!Server.instance) {
//             Server.instance = new Server();
//         }

//         return Server.instance;
//     }

//     private _players = 0;
//     private _interval = null as any;

//     constructor() { }

//     init(): void {
//         const app = express();
//         const http = require('http').Server(app)
//         const io = require('socket.io')(http);
//         const port = process.env.PORT || 3000;

//         app.use('/', express.static('public'));

//         http.listen(port, () => console.log(`Server is on, port ${port}.`));

//         io.on('connection', this.onConnect);
//     }

//     onConnect(client: any): void {
//         const nickName = 'Username' + Math.random().toString();

//         this.playerCount++;

//         state.addPlayer(nickName);

//         this._interval = setInterval(() => {
//             client.emit('gameState', JSON.stringify(state.getState()));
//         }, 1000 / ServerConfig.FrameRate)

//         client.on('disconnect', () => {
//             state.removePlayer(nickName);
//             clearInterval(this._interval);
//             this._interval = null;
//         });
//     }

//     get playerCount(): number {
//         return this._players;
//     }

//     set playerCount(num: number) {
//         this._players = num;
//     }
// }

// const server = Server.getInstance()
// server.init();
