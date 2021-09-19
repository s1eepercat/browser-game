const { ServerConfig } = require('./consts/server-config.const');

class State {
    static instance;

    static getInstance() {
        if (!State.instance) {
            State.instance = new State();
        }

        return State.instance;
    }

    state;

    constructor() { }

    iniState() {
        this.state = {
            players: [],
            food: [
                {
                    x: 7,
                    y: 7
                }
            ],
            gridSize: ServerConfig.GridSize
        }
    }

    getState() {
        return this.state;
    }

    getPlayerById(id) {
        return this.state.players.find(player => player.id === id);
    }

    allPlayersExcept(id) {
        return this.state.players.filter(player => player.id !== id);
    }

    addPlayer(id, name) {
        const newPlayer = { // init player object
            id,
            name,
            pos: {
                x: Math.floor(Math.random() * ServerConfig.GridSize),
                y: Math.floor(Math.random() * ServerConfig.GridSize)
            },
            vel: { x: 0, y: 0 }
        };

        this.state.players.length && this.state.players.forEach(player => { // make sure player is not spawning inside another player
            if (player.pos.x === newPlayer.pos.x && player.pos.y === newPlayer.pos.y) {
                return this.addPlayer(id, name);
            }
        });

        this.state = { ...this.state, players: [...this.state.players, newPlayer] }
    }

    removePlayer(id) {
        this.state = { ...this.state, players: this.state.players.filter(player => player.id !== id) }
    }

    setPlayerVelocity(id, velocity) {
        const player = this.getPlayerById(id);

        this.state = {
            ...this.state,
            players: [
                ...this.allPlayersExcept(id),
                {
                    ...player,
                    vel: {
                        x: Math.sign(velocity.x), // prevent speedhacking
                        y: Math.sign(velocity.y)
                    }
                }
            ]
        }
    }

    updatePlayerPosition(id) {
        const player = this.getPlayerById(id);

        if (player.vel.x === 0 && player.vel.y === 0) { // make sure player needs moving
            return;
        }

        this.state = {
            ...this.state,
            players: [
                ...this.allPlayersExcept(id),
                {
                    ...player,
                    pos: {
                        x: player.pos.x + player.vel.x,
                        y: player.pos.y + player.vel.y
                    }
                }
            ]
        }
    }
}

module.exports = {
    State
}