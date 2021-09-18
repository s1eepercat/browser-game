import { Controller } from "./controller";
import { Renderer } from "./renderer";

const renderer = Renderer.getInstance();
const controller = Controller.getInstance();

renderer.init();
controller.init();

//@ts-ignore
const socket = io('/');

socket.on('nameRequest', nameResponse);

function nameResponse(): void {
    socket.emit('nameResponse', 'MyNickname');
}

socket.on('gameState', handleGameState);

function handleGameState(gameState: any) {
    gameState = JSON.parse(gameState);
    requestAnimationFrame(() => renderer.renderGame(gameState))
}