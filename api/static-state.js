const { MapWidth, MapHeight, GridSize } = require('./consts/server-config.const');

class StaticState {
    static instance;

    static getInstance() {
        if (!StaticState.instance) {
            StaticState.instance = new StaticState();
        }

        return StaticState.instance;
    }

    _staticState;

    constructor() { }

    iniState() {
        this._staticState = {
            map: {
                mapWidth: MapWidth,
                mapHeight: MapHeight
            },
            gridSize: GridSize
        }
    }

    getSharedState() {
        return this._staticState;
    }
}

module.exports = {
    StaticState
}