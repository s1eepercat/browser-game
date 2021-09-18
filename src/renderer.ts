import { Colors } from "./enums/colors.enum";
import { Config } from "./consts/config.const";
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

        this.canvas.height = Config.worldHeight;
        this.canvas.width = Config.worldWidth;
    }

    renderGame(state: GameStateDto): void {
        this.renderWorld();
        this.renderFood(state);
        //     paintPlayer()
    }

    private renderWorld(): void {
        this.ctx.fillStyle = Colors.BgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = Colors.BgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private renderFood(state: GameStateDto): void {
        const food = state.food[0];
        const gridSize = state.gridSize;
        const sizeW = this.canvas.width / gridSize;
        const sizeH = this.canvas.height / gridSize;

        this.ctx.fillStyle = Colors.ItemColor;
        this.ctx.fillRect(food.x * sizeW, food.y * sizeH, sizeW, sizeH);
    }
}
