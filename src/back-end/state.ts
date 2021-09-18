import { GameStateDto } from "../shared/models/game-state-dto.model";
import { ServerConfig } from "./consts/server-config.const";

export class State {
    private static instance: typeof State.prototype;

    public static getInstance(): typeof State.prototype {
        if (!State.instance) {
            State.instance = new State();
        }

        return State.instance;
    }

    private state: GameStateDto;

    constructor() {

    }

    iniState(): void {
        this.state = {
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
            gridSize: ServerConfig.GridSize
        }
    }

    getState(): GameStateDto {
        return this.state;
    }
}