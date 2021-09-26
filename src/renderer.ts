import { SpawnSize, SpawnX, SpawnY, GridSize, MapWidth, MapHeight, CanvasW, CanvasH } from "../api/consts/config.const";
import { Colors } from "./enums/colors.enum";
import { CrawlerDto, DynamicStateDto, ItemDto, PlayerDto } from "./models/dynamic-state-dto.model";
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

    init(): { gridW: number, gridH: number } {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth * CanvasW;
        this.canvas.height = window.innerHeight * CanvasH;

        return {
            gridW: Math.floor(this.canvas.width / GridSize),
            gridH: Math.floor(this.canvas.height / GridSize)
        }
    }

    renderGame(state: GameState): void {
        const { playerX, playerY } = this.getPlayerPosition(state);
        this.renderWorld(state);
        this.renderSpawn(state, playerX, playerY);
        this.renderPlayer(state, playerX, playerY);
        this.renderPlayers(state, playerX, playerY);
        this.renderCrawlers(state, playerX, playerY);
        this.renderItems(state, playerX, playerY);
    }

    private getPlayerPosition(state: GameState): { playerX: number, playerY: number } {
        const player = state.player;

        const gridCanvasWidth = Math.ceil(this.canvas.width / GridSize);
        const gridCanvasHeight = Math.ceil(this.canvas.height / GridSize);

        let playerX: number;
        let playerY: number;

        if (player.pos.x <= gridCanvasWidth / 2) {
            playerX = player.pos.x * GridSize;
        } else if (player.pos.x >= MapWidth - gridCanvasWidth / 2) {
            playerX = this.canvas.width - (MapWidth - player.pos.x) * GridSize
        } else {
            playerX = this.canvas.width / 2;
        }

        if (player.pos.y <= gridCanvasHeight / 2) {
            playerY = player.pos.y * GridSize;
        } else if (player.pos.y >= MapHeight - gridCanvasHeight / 2) {
            playerY = this.canvas.height - (MapHeight - player.pos.y) * GridSize
        } else {
            playerY = this.canvas.height / 2;
        }

        return { playerX, playerY };
    }

    private renderWorld(state: GameState): void {
        // this.ctx.fillStyle = Colors.BgColor;
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // this.ctx.fillStyle = Colors.FloorColor;
        // this.ctx.fillRect(0, 0, MapWidth * GridSize, MapHeight * GridSize);

        this.ctx.fillStyle = Colors.FloorColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private renderSpawn(state: GameState, playerX: number, playerY: number): void {
        //Spawn
        const gridCanvasWidth = Math.ceil(this.canvas.width / GridSize);
        const gridCanvasHeight = Math.ceil(this.canvas.height / GridSize);

        const xGridDiff = SpawnX - state.player.pos.x;
        const yGridDiff = SpawnY - state.player.pos.y;

        if (Math.abs(xGridDiff) < gridCanvasWidth && Math.abs(yGridDiff) < gridCanvasHeight) {
            this.ctx.fillStyle = Colors.SpawnColor;
            this.ctx.fillRect(playerX + (xGridDiff * GridSize), playerY + (yGridDiff * GridSize), SpawnSize * GridSize, SpawnSize * GridSize);
        }
    }

    private renderPlayer(state: GameState, playerX: number, playerY: number): void {
        //name
        this.ctx.fillStyle = Colors.NameColor;
        this.ctx.font = "25px Arial";
        const textWidth = this.ctx.measureText(state.player.name).width;
        this.ctx.fillText(state.player.name, playerX - (textWidth / 2) + (GridSize / 2), playerY - GridSize / 2);

        //character
        this.ctx.fillStyle = Colors.PlayerColor;
        this.ctx.fillRect(playerX, playerY, GridSize, GridSize);
    }

    private renderPlayers(state: GameState, playerX: number, playerY: number): void {
        if (!state.hasOwnProperty('players')) {
            return;
        }

        // const gridCanvasWidth = Math.ceil(this.canvas.width / GridSize);
        // const gridCanvasHeight = Math.ceil(this.canvas.height / GridSize);

        state.players.forEach((player: PlayerDto) => {
            const xGridDiff = player.pos.x - state.player.pos.x;
            const yGridDiff = player.pos.y - state.player.pos.y;

            // if (Math.abs(xGridDiff) < gridCanvasWidth && Math.abs(yGridDiff) < gridCanvasHeight) {
            //name
            this.ctx.fillStyle = Colors.NameColor;
            this.ctx.font = "25px Arial";
            const textWidth = this.ctx.measureText(player.name).width;
            this.ctx.fillText(player.name, (playerX + (xGridDiff * GridSize)) - (textWidth / 2) + (GridSize / 2), (playerY + (yGridDiff * GridSize)) - GridSize / 2);

            //character
            this.ctx.fillStyle = Colors.PlayersColor;
            this.ctx.fillRect(playerX + (xGridDiff * GridSize), playerY + (yGridDiff * GridSize), GridSize, GridSize);
            // }
        })
    }

    private renderCrawlers(state: GameState, playerX: number, playerY: number): void {
        if (!state.hasOwnProperty('crawlers')) {
            return;
        }

        // const gridCanvasWidth = Math.ceil(this.canvas.width / GridSize);
        // const gridCanvasHeight = Math.ceil(this.canvas.height / GridSize);

        state.crawlers.forEach((crawler: CrawlerDto) => {
            const xGridDiff = crawler.pos.x - state.player.pos.x;
            const yGridDiff = crawler.pos.y - state.player.pos.y;

            // if (Math.abs(xGridDiff) < gridCanvasWidth && Math.abs(yGridDiff) < gridCanvasHeight) {
            this.ctx.fillStyle = Colors.CrawlerColor;
            this.ctx.fillRect(playerX + (xGridDiff * GridSize), playerY + (yGridDiff * GridSize), GridSize, GridSize);
            // }
        });
    }

    private renderItems(state: GameState, playerX: number, playerY: number): void {
        if (!state.hasOwnProperty('items')) {
            return;
        }

        // const gridCanvasWidth = Math.ceil(this.canvas.width / GridSize);
        // const gridCanvasHeight = Math.ceil(this.canvas.height / GridSize);

        state.items.forEach((item: ItemDto) => {
            const xGridDiff = item.pos.x - state.player.pos.x;
            const yGridDiff = item.pos.y - state.player.pos.y;

            // if (Math.abs(xGridDiff) < gridCanvasWidth && Math.abs(yGridDiff) < gridCanvasHeight) {
            this.ctx.fillStyle = Colors.ItemColor;
            this.ctx.fillRect(playerX + (xGridDiff * GridSize), playerY + (yGridDiff * GridSize), GridSize, GridSize);
            // }
        });
    }
}
