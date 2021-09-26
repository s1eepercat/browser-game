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

    socket.on('staticState', (staticState: StaticStateDto) => new Player(staticState).init());
}

class Player {
    private readonly controls = Controls.getInstance();
    private readonly renderer = Renderer.getInstance();

    private dynamicState: DynamicStateDto = {
        players: [],
        items: [],
        crawlers: []
    };

    constructor(private staticState: StaticStateDto) { }

    init(): void {
        this.controls.init(socket);
        this.renderer.init();

        socket.on('dynamicState', this.onDynamicStateChange.bind(this))
    }

    onDynamicStateChange(dynamicStateDto: DynamicStateDto): void {
        console.log(dynamicStateDto);

        if (!this.dynamicState) {
            this.dynamicState = dynamicStateDto;
        } else {
            this.dynamicState = {
                ...this.dynamicState,
                player: dynamicStateDto.player
            }
            if (dynamicStateDto.hasOwnProperty('players')) {
                this.dynamicState = {
                    ...this.dynamicState,
                    players: dynamicStateDto.players
                }
            }
            if (dynamicStateDto.hasOwnProperty('items')) {
                this.dynamicState = {
                    ...this.dynamicState,
                    items: dynamicStateDto.items
                }
            }
            if (dynamicStateDto.hasOwnProperty('crawlers')) {
                this.dynamicState = {
                    ...this.dynamicState,
                    crawlers: dynamicStateDto.crawlers
                }
            }
        }

        requestAnimationFrame(() => this.renderer.renderGame({ ...this.staticState, ...this.dynamicState }));
    }
}
