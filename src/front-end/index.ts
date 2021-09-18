// import { Colors } from "./enums/colors.enum";
// import { GameStateDto } from "./models/game-state-dto.model";
import { Controller } from "./controller";
import { Renderer } from "./renderer";

// const gameScreen = document.getElementById('game-screen');

const renderer = Renderer.getInstance();
const controller = Controller.getInstance();

renderer.init();
controller.init();

// renderer.renderGame(state.getState()); 

//@ts-ignore
const socket = io('/');

socket.on('connected', handleInit);
socket.on('gameState', handleGameState);

function handleInit(msg: any): void {
    console.log(msg);
}

function handleGameState(gameState: any) {
    gameState = JSON.parse(gameState);
    requestAnimationFrame(() => renderer.renderGame(gameState))
}