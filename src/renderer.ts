import { Colors } from "./enums/colors.enum";
import { DynamicStateDto, ItemDto, PlayerDto } from "./models/dynamic-state-dto.model";
import { StaticStateDto } from "./models/static-state-dto.model";

interface GameState extends StaticStateDto, DynamicStateDto { }

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

    renderGame(state: GameState): void {
        this.renderWorld(state);
        const { playerX, playerY } = this.renderPlayer(state);
        this.renderPlayers(state, playerX, playerY);
        this.renderItems(state, playerX, playerY);
    }

    private renderWorld(state: GameState): void {
        this.ctx.fillStyle = Colors.BgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = Colors.FloorColor;
        this.ctx.fillRect(0, 0, state.map.mapWidth * state.gridSize, state.map.mapHeight * state.gridSize);
    }

    private renderPlayer(state: GameState): { playerX: number, playerY: number } {
        const player = state.player;

        const gridCanvasWidth = Math.ceil(this.canvas.width / state.gridSize);
        const gridCanvasHeight = Math.ceil(this.canvas.height / state.gridSize);

        let playerX: number;
        let playerY: number;

        if (player.pos.x <= gridCanvasWidth / 2) {
            playerX = player.pos.x * state.gridSize;
        } else if (player.pos.x >= state.map.mapWidth - gridCanvasWidth / 2) {
            playerX = this.canvas.width - (state.map.mapWidth - player.pos.x) * state.gridSize
        } else {
            playerX = this.canvas.width / 2;
        }

        if (player.pos.y <= gridCanvasHeight / 2) {
            playerY = player.pos.y * state.gridSize;
        } else if (player.pos.y >= state.map.mapHeight - gridCanvasHeight / 2) {
            playerY = this.canvas.height - (state.map.mapHeight - player.pos.y) * state.gridSize
        } else {
            playerY = this.canvas.height / 2;
        }

        //name
        this.ctx.fillStyle = Colors.NameColor;
        this.ctx.font = "25px Arial";
        const textWidth = this.ctx.measureText(player.name).width;
        this.ctx.fillText(player.name, playerX - (textWidth / 2) + (state.gridSize / 2), playerY - state.gridSize / 2);

        //character
        this.ctx.fillStyle = Colors.PlayerColor;
        this.ctx.fillRect(playerX, playerY, state.gridSize, state.gridSize);

        return { playerX, playerY };
    }

    private renderPlayers(state: GameState, playerX: number, playerY: number): void {
        const gridCanvasWidth = Math.ceil(this.canvas.width / state.gridSize);
        const gridCanvasHeight = Math.ceil(this.canvas.height / state.gridSize);

        state.players.forEach((player: PlayerDto) => {
            const xGridDiff = player.pos.x - state.player.pos.x;
            const yGridDiff = player.pos.y - state.player.pos.y;

            if (Math.abs(xGridDiff) < gridCanvasWidth && Math.abs(yGridDiff) < gridCanvasHeight) {
                //name
                this.ctx.fillStyle = Colors.NameColor;
                this.ctx.font = "25px Arial";
                const textWidth = this.ctx.measureText(player.name).width;
                this.ctx.fillText(player.name, (playerX + (xGridDiff * state.gridSize)) - (textWidth / 2) + (state.gridSize / 2), (playerY + (yGridDiff * state.gridSize)) - state.gridSize / 2);

                //character
                this.ctx.fillStyle = Colors.PlayersColor;
                this.ctx.fillRect(playerX + (xGridDiff * state.gridSize), playerY + (yGridDiff * state.gridSize), state.gridSize, state.gridSize);
            }
        })
    }

    private renderItems(state: GameState, playerX: number, playerY: number): void {
        const gridCanvasWidth = Math.ceil(this.canvas.width / state.gridSize);
        const gridCanvasHeight = Math.ceil(this.canvas.height / state.gridSize);

        state.items.forEach((item: ItemDto) => {
            const xGridDiff = item.pos.x - state.player.pos.x;
            const yGridDiff = item.pos.y - state.player.pos.y;

            if (Math.abs(xGridDiff) < gridCanvasWidth && Math.abs(yGridDiff) < gridCanvasHeight) {
                this.ctx.fillStyle = Colors.ItemColor;
                this.ctx.fillRect(playerX + (xGridDiff * state.gridSize), playerY + (yGridDiff * state.gridSize), state.gridSize, state.gridSize);
            }
        });
    }
}
