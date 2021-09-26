// const { MapWidth, MapHeight, GridSize } = require('./consts/server-config.const');

class StaticState {
    static instance;
    static getInstance() {
        if (!StaticState.instance) {
            StaticState.instance = new StaticState();
        }
        return StaticState.instance;
    }

    staticState;

    constructor() { }

    iniState() {
        this.staticState = {
            // map: {
            //     mapWidth: MapWidth,
            //     mapHeight: MapHeight
            // },
            // gridSize: GridSize
        }
    }

    getSharedState() {
        return this.staticState;
    }
}

module.exports = {
    StaticState
}