export class Controller {
    private static instance: typeof Controller.prototype;

    public static getInstance(): typeof Controller.prototype {
        if (!Controller.instance) {
            Controller.instance = new Controller();
        }

        return Controller.instance;
    }

    private readonly validKeys = [87, 83, 65, 68];
    // 87 = W
    // 65 = A
    // 68 = D
    // 83 = S

    constructor() { }

    init(socket: any): void {
        document.addEventListener('keydown', (event) => {
            if (this.validKeys.includes(event.keyCode)) {
                socket.emit('input', {
                    type: 'keydown',
                    keyCode: event.keyCode
                })
            }
        });

        document.addEventListener('keyup', (event) => {
            if (this.validKeys.includes(event.keyCode)) {
                socket.emit('input', {
                    type: 'keyup',
                    keyCode: event.keyCode
                })
            }
        });
    }
}
