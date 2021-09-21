import { GameStateDto } from "./models/game-state-dto.model";
import { Controls } from "./controls";
import { Renderer } from "./renderer";

//@ts-ignore
const socket = io('/');

const gameScreen = document.getElementById('game-screen');
const formScreen = document.getElementById('form-screen');
const input = document.getElementById('username-input');
const loginForm = document.getElementById('nickname-form');
loginForm.addEventListener('submit', handleSubmit);

function handleSubmit(event: Event): void {
    event.preventDefault();
    socket.emit('playerInit', `${input.value}`);

    formScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    new Promise((resolve) => {
        socket.on('playerAdded', () => resolve(true));
    })
        .then(() => startGame());
}

function startGame(): void {
    const renderer = Renderer.getInstance();
    const controls = Controls.getInstance();

    socket.on('gameState', handleGameState);
    function handleGameState(gameStateDto: string) {
        const gameState: GameStateDto = JSON.parse(gameStateDto);
        requestAnimationFrame(() => renderer.renderGame(gameState));
    }

    controls.init(socket);
    renderer.init();
}
