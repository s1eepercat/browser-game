import { GameStateDto } from "./models/game-state-dto.model";
import { Controls } from "./controls";
import { Renderer } from "./renderer";

const renderer = Renderer.getInstance();
const controls = Controls.getInstance();

//@ts-ignore
const socket = io('/');

socket.on('nameRequest', nameResponse);
function nameResponse(): void {
    socket.emit('nameResponse', 'MyNickname');
}

socket.on('gameState', handleGameState);
function handleGameState(gameStateDto: string) {
    const gameState: GameStateDto = JSON.parse(gameStateDto);
    console.log(gameState);
    requestAnimationFrame(() => renderer.renderGame(gameState));
}

controls.init(socket);
renderer.init();