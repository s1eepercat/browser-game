const { PlayerSpeed, ItemAmount, MapWidth, MapHeight } = require('./consts/server-config.const');

class DynamicState {
    static instance;

    static getInstance() {
        if (!DynamicState.instance) {
            DynamicState.instance = new DynamicState();
        }

        return DynamicState.instance;
    }

    _dynamicState;

    constructor() { }

    iniState() {
        this._dynamicState = {
            players: [],
            items: [],
        }

        do { this.addItems(); } while (this._dynamicState.items.length < ItemAmount);
    }

    getPlayerById(id) {
        return this._dynamicState.players.find(player => player.id === id);
    }

    getAllPlayersExcept(id) {
        return this._dynamicState.players.filter(player => player.id !== id);
    }

    getPersonalPlayerState(id) {
        return {
            ...this._dynamicState,
            players: [...this.getAllPlayersExcept(id)],
            player: this.getPlayerById(id)
        }
    }

    addPlayer(id, name) {
        const newPlayer = { // init player object
            id,
            name,
            pos: {
                x: Math.floor(Math.random() * MapWidth),
                y: Math.floor(Math.random() * MapHeight)
            },
            vel: { x: 0, y: 0 }
        };

        if (this.getAllPlayersExcept(id).length) {
            this.getAllPlayersExcept(id).forEach(player => { // make sure player is not spawning inside another player
                if (player.pos.x === newPlayer.pos.x && player.pos.y === newPlayer.pos.y) {
                    return this.addPlayer(id, name);
                }
            });
        }

        this._dynamicState = { ...this._dynamicState, players: [...this._dynamicState.players, newPlayer] }
    }

    addItems() {
        do {
            const newItem = { // init item object
                pos: {
                    x: Math.floor(Math.random() * MapWidth),
                    y: Math.floor(Math.random() * MapHeight)
                }
            };

            this._dynamicState.players.forEach(player => { // make sure item is not spawning inside a player
                if (player.pos.x === newItem.pos.x && player.pos.y === newItem.pos.y) {
                    return this.addItems();
                }
            });

            this._dynamicState = { ...this._dynamicState, items: [...this._dynamicState.items, newItem] }

        } while (this._dynamicState.items.length < ItemAmount);
    }

    removePlayer(id) {
        this._dynamicState = { ...this._dynamicState, players: this.getAllPlayersExcept(id) }
    }

    setPlayerVelocity(id, velocity) {
        const player = this.getPlayerById(id);

        if (!player) {
            return;
        }

        this._dynamicState = {
            ...this._dynamicState,
            players: [
                ...this.getAllPlayersExcept(id),
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

        if (player.pos.x + player.vel.x === MapWidth // prevent X movement out of the map
            || player.pos.x + player.vel.x === -1) {
            xEdge = true;
        }

        if (player.pos.y + player.vel.y === MapHeight // prevent Y movement out of the map
            || player.pos.y + player.vel.y === -1) {
            yEdge = true;
        }

        this.getAllPlayersExcept(id).forEach(otherPlayer => { // prevent collision with players
            collision = this.checkCollision(player, otherPlayer.pos.x, otherPlayer.pos.y) || collision;
        });

        this._dynamicState.items.forEach(item => { // prevent collision with items
            collision = this.checkCollision(player, item.pos.x, item.pos.y) || collision;
        });

        if (!collision) {
            this._dynamicState = {
                ...this._dynamicState,
                players: [
                    ...this.getAllPlayersExcept(id),
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
    DynamicState
}