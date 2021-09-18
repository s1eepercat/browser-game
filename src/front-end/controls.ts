export class Controls {
    private static instance: typeof Controls.prototype;

    public static getInstance(): typeof Controls.prototype {
        if (!Controls.instance) {
            Controls.instance = new Controls();
        }

        return Controls.instance;
    }

    constructor() { }

    init(socket: any): void {
        this.initMovement(socket);
    }

    initMovement(socket: any): void {
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

            socket.emit('velocityChange', { x: left + right, y: up + down });
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

            socket.emit('velocityChange', { x: left + right, y: up + down });
        });
    }
}
