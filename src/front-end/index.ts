// import { Colors } from "./enums/colors.enum";
// import { GameStateDto } from "./models/game-state-dto.model";
import { Controller } from "./controller";
import { Renderer } from "./renderer";
import { State } from "./state";

// const gameScreen = document.getElementById('game-screen');

const renderer = Renderer.getInstance();
const controller = Controller.getInstance();
const state = State.getInstance();

state.init();
renderer.init();
controller.init();

renderer.renderGame(state.getState());