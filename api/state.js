const { GridSize, PlayerSpeed, MapWidth, MapHeight, ItemAmount } = require('./consts/server-config.const');

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
            map: {
                mapWidth: MapWidth,
                mapHeight: MapHeight
            },
            items: [],
            gridSize: GridSize
        }

        do {
            this.addItems();
        } while (this.state.items.length < ItemAmount);
    }

    getStateForPlayer(id) {
        return {
            ...this.state,
            players: [...this.allPlayersExcept(id)],
            player: this.getPlayerById(id)
        }
    }

    getPlayerById(id) {
        return this.state.players.find(player => player.id === id);
    }

    allPlayersExcept(id) {
        return this.state.players.filter(player => player.id !== id);
    }

    addItems() {
        const newItem = { // init item object
            pos: {
                x: Math.floor(Math.random() * this.state.map.mapWidth),
                y: Math.floor(Math.random() * this.state.map.mapHeight)
            }
        };

        this.state.players.forEach(player => { // make sure item is not spawning inside a player
            if (player.pos.x === newItem.pos.x && player.pos.y === newItem.pos.y) {
                return this.addItems();
            }
        });

        this.state = { ...this.state, items: [...this.state.items, newItem] }
    }

    addPlayer(id, name) {
        const newPlayer = { // init player object
            id,
            name,
            pos: {
                x: Math.floor(Math.random() * this.state.map.mapWidth),
                y: Math.floor(Math.random() * this.state.map.mapHeight)
            },
            vel: { x: 0, y: 0 }
        };

        if (this.allPlayersExcept(id).length) {
            this.allPlayersExcept(id).forEach(player => { // make sure player is not spawning inside another player
                if (player.pos.x === newPlayer.pos.x && player.pos.y === newPlayer.pos.y) {
                    return this.addPlayer(id, name);
                }
            });
        }

        this.state = { ...this.state, players: [...this.state.players, newPlayer] }
    }

    removePlayer(id) {
        this.state = { ...this.state, players: this.state.players.filter(player => player.id !== id) }
    }

    setPlayerVelocity(id, velocity) {
        const player = this.getPlayerById(id);

        if (!player) {
            return;
        }

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

        let collision;
        let xEdge;
        let yEdge;

        if (player.pos.x + player.vel.x === this.state.map.mapWidth // prevent X movement out of the map
            || player.pos.x + player.vel.x === -1) {
            xEdge = true;
        }

        if (player.pos.y + player.vel.y === this.state.map.mapHeight// prevent Y movement out of the map
            || player.pos.y + player.vel.y === -1) {
            yEdge = true;
        }

        this.allPlayersExcept(id).forEach(otherPlayer => { // prevent collision with players
            collision = this.checkCollision(player, otherPlayer.pos.x, otherPlayer.pos.y) || collision;
        });

        this.state.items.forEach(item => { // prevent collision with items
            collision = this.checkCollision(player, item.pos.x, item.pos.y) || collision;
        });

        if (!collision) {
            this.state = {
                ...this.state,
                players: [
                    ...this.allPlayersExcept(id),
                    {
                        ...player,
                        pos: {
                            x: player.pos.x + (xEdge ? 0 : player.vel.x * PlayerSpeed),
                            y: player.pos.y + (yEdge ? 0 : player.vel.y * PlayerSpeed)
                        }
                    }
                ]
            }
        }

    }

    checkCollision(player, objectX, objectY) {
        let collision = false;

        if (player.pos.x + player.vel.x * PlayerSpeed === objectX &&
            player.pos.y + player.vel.y * PlayerSpeed === objectY) {
            collision = true;
        }

        return collision;
    }
}

module.exports = {
    State
}