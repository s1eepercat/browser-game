import { GameStateDto } from "../shared/models/game-state-dto.model";
import { InputDto } from "../shared/models/input-dto.model";
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

    setPlayerVelocity(id: string, input: InputDto): void {
        const player = this.state.players.find((player) => player.id === id);

        let xVel = 0;
        let yVel = 0;

        if (input.type === 'keydown') {
            switch (input.keyCode) {
                case 83:
                    if (player.vel.y < 1) { // down
                        yVel += 1;
                    }
                    break;
                case 87:
                    if (player.vel.y > -1) { // up
                        yVel -= 1;
                    }
                    break;
                case 68:
                    if (player.vel.x < 1) { // right
                        xVel += 1;
                    }
                    break;
                case 65:
                    if (player.vel.x > -1) { // left
                        xVel -= 1;
                    }
                    break;
            }
        }

        if (input.type === 'keyup') {
            switch (input.keyCode) {
                case 83:
                    if (player.vel.y > 0) {
                        yVel -= 1;
                    }
                    break;
                case 87:
                    if (player.vel.y < 0) {
                        yVel += 1;
                    }
                    break;
                case 68:
                    if (player.vel.x > 0) {
                        xVel -= 1;
                    }
                    break;
                case 65:
                    if (player.vel.x < 0) {
                        xVel += 1;
                    }
                    break;
            }
        }

        this.state = {
            ...this.state,
            players: [
                ...this.state.players.filter((player) => player.id !== id),
                {
                    ...player,
                    vel: {
                        x: player.vel.x + xVel,
                        y: player.vel.y + yVel
                    }
                }
            ]
        }
    }

    setPlayerPosition(id: string): void {
        const player = this.state.players.find((player) => player.id === id);

        if (player.vel.x === 0 && player.vel.y === 0) {
            return;
        }

        this.state = {
            ...this.state,
            players: [
                ...this.state.players.filter((player) => player.id !== id),
                {
                    ...player,
                    pos: {
                        x: player.pos.x + player.vel.x,
                        y: player.pos.y + player.vel.y
                    }
                }
            ]
        }
    }
}