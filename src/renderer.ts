import { Colors } from "./enums/colors.enum";
import { GameStateDto } from "./models/game-state-dto.model";

export class Renderer {
    private static instance: typeof Renderer.prototype;

    public static getInstance(): typeof Renderer.prototype {
        if (!Renderer.instance) {
            Renderer.instance = new Renderer();
        }

        return Renderer.instance;
    }

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() { }

    init(): void {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.height = window.innerHeight * 0.75;
        this.canvas.width = window.innerWidth * 0.75;
    }

    renderGame(state: GameStateDto): void {
        this.renderWorld(state);
        this.renderPlayer(state);
    }

    private renderWorld(state: GameStateDto): void {
        this.ctx.fillStyle = Colors.BgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = Colors.FloorColor;
        this.ctx.fillRect(0, 0, state.map.mapWidth * state.gridSize, state.map.mapHeight * state.gridSize);
    }

    // private renderFood(state: GameStateDto): void {
    //     const food = state.food[0];
    //     const sizeW = this.canvas.width / state.gridSize;
    //     const sizeH = this.canvas.height / state.gridSize;

    //     this.ctx.fillStyle = Colors.ItemColor;
    //     this.ctx.fillRect(food.x * sizeW, food.y * sizeH, sizeW, sizeH);
    // }

    private renderPlayer(state: GameStateDto): void {
        state.players.forEach((player) => {

            //name
            this.ctx.fillStyle = Colors.NameColor;
            this.ctx.font = "25px Arial";
            const textWidth = this.ctx.measureText(player.name).width;
            this.ctx.fillText(player.name, (player.pos.x * state.gridSize) - (textWidth / 2) + (state.gridSize / 2), player.pos.y * state.gridSize - state.gridSize / 2);

            //character
            this.ctx.fillStyle = Colors.PlayerColor;
            this.ctx.fillRect(player.pos.x * state.gridSize, player.pos.y * state.gridSize, state.gridSize, state.gridSize);
        })
    }
}
