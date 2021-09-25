const { PlayerSpeed, VisibilityDistanceX, VisibilityDistanceY } = require('../consts/server-config.const');

class Utilities {
    static instance;
    static getInstance() {
        if (!Utilities.instance) {
            Utilities.instance = new Utilities();
        }
        return Utilities.instance;
    }

    constructor() { }

    isInVisibleDistance(player, objectX, objectY) {
        return Math.abs(player.pos.x - objectX) < VisibilityDistanceX && Math.abs(player.pos.y - objectY) < VisibilityDistanceY;
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
    Utilities
}