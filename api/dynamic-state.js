const {
    PlayerSpeed,
    ItemAmountPerPlayer,
    MapWidth,
    MapHeight,
    SpawnX,
    SpawnY,
    SpawnSize,
    CrawlersPerPlayer,
    CrawlersSpawnDistance
} = require('./consts/config.const');
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
            crawlers: []
        }

        do { this.addItems(); } while (this.dynamicState.items.length < ItemAmountPerPlayer);
        do { this.addEnemy('crawlers'); } while (this.dynamicState.crawlers.length < CrawlersPerPlayer);
    }

    getPlayerById(id) {
        return this.dynamicState.players.find(player => player.id === id);
    }

    getAllPlayersExcept(id) {
        return this.dynamicState.players.filter(player => player.id !== id);
    }

    getPersonalPlayerState(id, canvasSize) {
        const currentPlayer = this.getPlayerById(id);

        let state = {
            player: {
                name: currentPlayer.name,
                pos: currentPlayer.pos
            }
        };

        const players = this.getAllPlayersExcept(id)
            .filter(player => Utilities.get().isAtDistance(currentPlayer, player, canvasSize.gridW, canvasSize.gridH))
            .map(player => { return { name: player.name, pos: player.pos } });

        const items = this.dynamicState.items.filter(item => Utilities.get().isAtDistance(currentPlayer, item, canvasSize.gridW, canvasSize.gridH));

        const crawlers = this.dynamicState.crawlers
            .filter(crawler => Utilities.get().isAtDistance(currentPlayer, crawler, canvasSize.gridW, canvasSize.gridH))
            .map(crawler => { return { pos: crawler.pos } });

        if (players.length) {
            state['players'] = players;
        }

        if (items.length) {
            state['items'] = items;
        }

        if (crawlers.length) {
            state['crawlers'] = crawlers;
        }

        return state;
    }

    addPlayer(id, name) {
        const newPlayer = {
            id,
            name,
            pos: {
                x: SpawnX + Math.floor(Math.random() * SpawnSize),
                y: SpawnY + Math.floor(Math.random() * SpawnSize)
            },
            vel: { x: 0, y: 0 }
        };

        if (this.getAllPlayersExcept(id).length) {
            this.getAllPlayersExcept(id).forEach(player => {
                if (player.pos.x === newPlayer.pos.x && player.pos.y === newPlayer.pos.y) {
                    return this.addPlayer(id, name);
                }
            });
        }

        this.dynamicState = { ...this.dynamicState, players: [...this.dynamicState.players, newPlayer] }
    }

    addItems() {
        do {
            const newItem = {
                pos: {
                    x: Math.floor(Math.random() * MapWidth),
                    y: Math.floor(Math.random() * MapHeight)
                }
            };

            this.dynamicState.players.forEach(player => {
                if (player.pos.x === newItem.pos.x && player.pos.y === newItem.pos.y) {
                    return this.addItems();
                }
            });

            this.dynamicState.items.forEach(item => {
                if (item.pos.x === newItem.pos.x && item.pos.y === newItem.pos.y) {
                    return this.addItems();
                }
            });

            if (
                (newItem.pos.x >= SpawnX && newItem.pos.x <= SpawnX + SpawnSize) &&
                (newItem.pos.y >= SpawnY && newItem.pos.y <= SpawnY + SpawnSize)
            ) {
                return this.addItems();
            }

            this.dynamicState = { ...this.dynamicState, items: [...this.dynamicState.items, newItem] }

        } while (this.dynamicState.items.length < ItemAmountPerPlayer);
    }

    addEnemy(enemy) {
        if (enemy === 'crawlers') {
            const crawler = {
                pos: {
                    x: Math.floor(Math.random() * MapWidth),
                    y: Math.floor(Math.random() * MapHeight)
                },
                vel: { x: 0, y: 0 }
            }

            this.dynamicState.players.forEach(player => {
                if (Utilities.get().isAtDistance(crawler, player, CrawlersSpawnDistance, CrawlersSpawnDistance)) {
                    return this.addEnemy('crawler');
                }
            });

            this.dynamicState.items.forEach(item => {
                if (item.pos.x === crawler.pos.x && item.pos.y === crawler.pos.y) {
                    return this.addEnemy('crawler');
                }
            });

            if (
                (crawler.pos.x >= SpawnX && crawler.pos.x <= SpawnX + SpawnSize) &&
                (crawler.pos.y >= SpawnY && crawler.pos.y <= SpawnY + SpawnSize)
            ) {
                return this.addEnemy('crawler');
            }

            this.dynamicState = { ...this.dynamicState, crawlers: [...this.dynamicState.crawlers, crawler] }
        }
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

        if (player.vel.x === 0 && player.vel.y === 0) {
            return;
        }

        let collision;
        let xEdge;
        let yEdge;

        if (player.pos.x + player.vel.x === MapWidth
            || player.pos.x + player.vel.x === -1) {
            xEdge = true;
        }

        if (player.pos.y + player.vel.y === MapHeight
            || player.pos.y + player.vel.y === -1) {
            yEdge = true;
        }

        this.getAllPlayersExcept(id).forEach(otherPlayer => {
            collision = Utilities.get().checkCollision(player, otherPlayer.pos.x, otherPlayer.pos.y) || collision;
        });

        this.dynamicState.items.forEach(item => {
            collision = Utilities.get().checkCollision(player, item.pos.x, item.pos.y) || collision;
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

    updateEnemeyPosition() {
        // console.log('enemy moves...')
    }
}

module.exports = {
    DynamicState
}