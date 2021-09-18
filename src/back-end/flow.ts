import { ServerConfig } from "./consts/server-config.const";

export class Flow {
    private static instance: typeof Flow.prototype;

    public static getInstance(): typeof Flow.prototype {
        if (!Flow.instance) {
            Flow.instance = new Flow();
        }

        return Flow.instance;
    }

    // private subscribers = [];

    constructor() { }

    initGameInterval(): void {
        const intervalId = setInterval(() => {

            // Game Flow
            //send gameState to all players?


        }, 1000 / ServerConfig.FrameRate)
    }

    
}

export default Flow.getInstance();