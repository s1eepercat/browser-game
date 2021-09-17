import { Colors } from "./enums/colors.enum";

const gameScreen = document.getElementById('game-screen');

let canvas, ctx;

function init(): void {
    canvas = document.getElementById('canvas') as any; // give proper type
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    ctx.fillStyle = Colors.BgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);
}

function keydown(e: KeyboardEvent): void {
    console.log(e.keyCode);
}

init();