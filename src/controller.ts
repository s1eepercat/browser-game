export class Controller {
    private static instance: typeof Controller.prototype;

    public static getInstance(): typeof Controller.prototype {
        if (!Controller.instance) {
            Controller.instance = new Controller();
        }

        return Controller.instance;
    }

    constructor() { }

    init(): void {
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
    }

    private keyDown($event: KeyboardEvent): void {
        console.log($event.keyCode, 'down');
    }

    private keyUp($event: KeyboardEvent): void {
        console.log($event.keyCode, 'up')
    }
}