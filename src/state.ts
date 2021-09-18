import { GameStateDto } from "./models/game-state-dto.model";

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

    init(): void {
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
            gridSize: 20
        }
    }

    getState(): GameStateDto {
        return this.state;
    }
}