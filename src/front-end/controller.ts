export class Controller {
    private static instance: typeof Controller.prototype;

    public static getInstance(): typeof Controller.prototype {
        if (!Controller.instance) {
            Controller.instance = new Controller();
        }

        return Controller.instance;
    }

    constructor() { }

    init(socket: any): void {
        let left = 0;
        let right = 0;
        let up = 0;
        let down = 0;

        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'a':
                    left = -1;
                    break;
                case 'd':
                    right = 1;
                    break;
                case 'w':
                    up = -1;
                    break;
                case 's':
                    down = 1;
                    break;
            }

            socket.emit('input', { x: left + right, y: up + down });
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'a':
                    left = 0;
                    break;
                case 'd':
                    right = 0;
                    break;
                case 'w':
                    up = 0;
                    break;
                case 's':
                    down = 0;
                    break;
            }

            socket.emit('input', { x: left + right, y: up + down });
        });
    }
}
