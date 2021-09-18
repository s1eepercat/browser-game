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
            players: [],
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

    addPlayer(id: string, name: string): void {
        const newPlayer = {
            id,
            name,
            pos: {
                x: Math.floor(Math.random() * ServerConfig.GridSize),
                y: Math.floor(Math.random() * ServerConfig.GridSize)
            },
            vel: {
                x: 0,
                y: 0
            }
        };

        this.state.players.forEach((player) => {
            if (player.pos.x === newPlayer.pos.x && player.pos.y === newPlayer.pos.y) {
                return this.addPlayer(id, name);
            }
        });

        this.state = {
            ...this.state,
            players: [...this.state.players, newPlayer]
        }
    }

    removePlayer(id: string): void {
        this.state = {
            ...this.state,
            players: this.state.players.filter((player) => player.id !== id)
        }
    }
}