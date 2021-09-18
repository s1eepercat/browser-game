import { GameStateDto, PlayerDto } from "../shared/models/game-state-dto.model";
import { PositionDto } from "../shared/models/position-dto.model";
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

    constructor() { }

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

    getPlayerById(id: string): PlayerDto {
        return this.state.players.find(player => player.id === id);
    }

    allPlayersExcept(id: string): PlayerDto[] {
        return this.state.players.filter(player => player.id !== id);
    }

    addPlayer(id: string, name: string): void {
        const newPlayer = { // init player object
            id,
            name,
            pos: {
                x: Math.floor(Math.random() * ServerConfig.GridSize),
                y: Math.floor(Math.random() * ServerConfig.GridSize)
            },
            vel: { x: 0, y: 0 }
        };

        this.state.players.forEach(player => { // make sure player is not spawning inside another player
            if (player.pos.x === newPlayer.pos.x && player.pos.y === newPlayer.pos.y) {
                return this.addPlayer(id, name);
            }
        });

        this.state = { ...this.state, players: [...this.state.players, newPlayer] }
    }

    removePlayer(id: string): void {
        this.state = { ...this.state, players: this.state.players.filter(player => player.id !== id) }
    }

    setPlayerVelocity(id: string, velocity: PositionDto): void {
        const player = this.getPlayerById(id);

        this.state = {
            ...this.state,
            players: [
                ...this.allPlayersExcept(id),
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

    updatePlayerPosition(id: string): void {
        const player = this.getPlayerById(id);

        if (player.vel.x === 0 && player.vel.y === 0) { // make sure player needs moving
            return;
        }

        this.state = {
            ...this.state,
            players: [
                ...this.allPlayersExcept(id),
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