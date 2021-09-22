import { StaticStateDto } from "./models/static-state-dto.model";
import { DynamicStateDto } from "./models/dynamic-state-dto.model";
import { Controls } from "./controls";
import { Renderer } from "./renderer";

//@ts-ignore
const socket = io('/');

const gameScreen = document.getElementById('game-screen');
const formScreen = document.getElementById('form-screen');

const nicknameForm = document.getElementById('nickname-form');
const input = document.getElementById('username-input');

nicknameForm.addEventListener('submit', onGameStart);

function onGameStart(event: Event): void {
    event.preventDefault();

    formScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    socket.emit('playerInit', `${input.value}`);

    socket.on('staticState', (staticState: string) => new Player(JSON.parse(staticState)).init());
}

class Player {
    private readonly controls = Controls.getInstance();
    private readonly renderer = Renderer.getInstance();

    constructor(private staticState: StaticStateDto) { }

    init(): void {
        this.controls.init(socket);
        this.renderer.init();

        socket.on('dynamicState', this.onDynamicStateChange.bind(this))
    }

    onDynamicStateChange(dynamicStateDto: string): void {
        const dynamicState: DynamicStateDto = JSON.parse(dynamicStateDto);
        requestAnimationFrame(() => this.renderer.renderGame({ ...this.staticState, ...dynamicState }));
    }
}
