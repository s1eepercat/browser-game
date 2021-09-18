import { GameStateDto } from "../shared/models/game-state-dto.model";

export const state: GameStateDto = {
    player: {
        pos: {
            x: 5,
            y: 10,
        },
        vel: {
            x: 0,
            y: 0
        }
    },
    food: [
        {
            x: 7,
            y: 7
        }
    ],
    gridSize: 20
}