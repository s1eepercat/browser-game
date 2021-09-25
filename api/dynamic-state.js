const { PlayerSpeed, ItemAmount, MapWidth, MapHeight } = require('./consts/server-config.const');
const { Utilities } = require('./helpers/utilities');

class DynamicState {
    static instance;
    static getInstance() {
        if (!DynamicState.instance) {
            DynamicState.instance = new DynamicState();
        }
        return DynamicState.instance;
    }

    dynamicState;

    constructor() { }

    iniState() {
        this.dynamicState = {
            players: [],
            items: [],
        }

        do { this.addItems(); } while (this.dynamicState.items.length < ItemAmount);
    }

    getPlayerById(id) {
        return this.dynamicState.players.find(player => player.id === id);
    }

    getAllPlayersExcept(id) {
        return this.dynamicState.players.filter(player => player.id !== id);
    }

    getPersonalPlayerState(id) {
        const currentPlayer = this.getPlayerById(id);

        let state = {
            player: {
                name: currentPlayer.name,
                pos: currentPlayer.pos
            }
        };

        const players = this.getAllPlayersExcept(id)
            .filter(player => Utilities.getInstance().isInVisibleDistance(currentPlayer, player.pos.x, player.pos.y))
            .map(player => { return { name: player.name, pos: player.pos } });

        const items = this.dynamicState.items.filter((item) => Utilities.getInstance().isInVisibleDistance(currentPlayer, item.pos.x, item.pos.y));

        if (players.length) {
            state['players'] = players;
        }

        if (items.length) {
            state['items'] = items;
        }

        return state;
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

        this.dynamicState = { ...this.dynamicState, players: [...this.dynamicState.players, newPlayer] }
    }

    addItems() {
        do {
            const newItem = { // init item object
                pos: {
                    x: Math.floor(Math.random() * MapWidth),
                    y: Math.floor(Math.random() * MapHeight)
                }
            };

            this.dynamicState.players.forEach(player => { // make sure item is not spawning inside a player
                if (player.pos.x === newItem.pos.x && player.pos.y === newItem.pos.y) {
                    return this.addItems();
                }
            });

            this.dynamicState = { ...this.dynamicState, items: [...this.dynamicState.items, newItem] }

        } while (this.dynamicState.items.length < ItemAmount);
    }

    removePlayer(id) {
        this.dynamicState = { ...this.dynamicState, players: this.getAllPlayersExcept(id) }
    }

    setPlayerVelocity(id, velocity) {
        const player = this.getPlayerById(id);

        if (!player) {
            return;
        }

        this.dynamicState = {
            ...this.dynamicState,
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
            collision = Utilities.getInstance().checkCollision(player, otherPlayer.pos.x, otherPlayer.pos.y) || collision;
        });

        this.dynamicState.items.forEach(item => { // prevent collision with items
            collision = Utilities.getInstance().checkCollision(player, item.pos.x, item.pos.y) || collision;
        });

        if (!collision) {
            this.dynamicState = {
                ...this.dynamicState,
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
}

module.exports = {
    DynamicState
}