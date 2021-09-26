import { StaticStateDto } from "./models/static-state-dto.model";
import { DynamicStateDto } from "./models/dynamic-state-dto.model";
import { Controls } from "./controls";
import { Renderer } from "./renderer";

const gameScreen = document.getElementById('game-screen');
const formScreen = document.getElementById('form-screen');

const nicknameForm = document.getElementById('nickname-form');
const input = document.getElementById('username-input') as HTMLFormElement;

nicknameForm.addEventListener('submit', ($event: Event) => new Player().init($event));

class Player {
    private readonly controls = Controls.getInstance();
    private readonly renderer = Renderer.getInstance();

    private staticState: StaticStateDto

    constructor() { }

    init($event: Event): void {
        $event.preventDefault();

        formScreen.style.display = 'none';
        gameScreen.style.display = 'block';

        //@ts-ignore
        const socket = io('/');

        this.controls.init(socket);
        const canvasSize = this.renderer.init();

        socket.emit('playerInit', {
            name: input.value,
            canvasSize: canvasSize
        });

        socket.on('staticState', (staticState: StaticStateDto) => this.staticState = staticState);
        socket.on('dynamicState', this.onDynamicStateChange.bind(this))
    }

    onDynamicStateChange(dynamicStateDto: DynamicStateDto): void {
        console.log(dynamicStateDto);
        requestAnimationFrame(() => this.renderer.renderGame({ ...this.staticState, ...dynamicStateDto }));
    }
}
