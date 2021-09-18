
import { GameStateDto } from "../shared/models/game-state-dto.model";
import { state } from "./state";

class Controller {
    private static instance: typeof Controller.prototype;

    public static getInstance(): typeof Controller.prototype {
        if (!Controller.instance) {
            Controller.instance = new Controller();
        }

        return Controller.instance;
    }

    constructor() { }

    getState(): GameStateDto {
        return state;
    }

    test: 123;
}

export default Controller.getInstance();