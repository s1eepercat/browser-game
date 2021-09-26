const { PlayerSpeed } = require('../consts/config.const');

class Utilities {
    static instance;
    static get() {
        if (!Utilities.instance) {
            Utilities.instance = new Utilities();
        }
        return Utilities.instance;
    }

    constructor() { }

    // isInVisibleDistance(objectA, objectB) {
    //     return Math.abs(objectA.pos.x - objectB.pos.x) < VisibilityDistanceX && Math.abs(objectA.pos.y - objectB.pos.y) < VisibilityDistanceY;
    // }

    isAtDistance(objectA, objectB, distanceX, distanceY) {
        return Math.abs(objectA.pos.x - objectB.pos.x) < distanceX && Math.abs(objectA.pos.y - objectB.pos.y) < distanceY;
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