import "phaser";
import {MainScene} from "./scenes/mainScene";

const config: GameConfig = {
    type: Phaser.AUTO,
    width: 2500,
    height: 1800,
    render: {pixelArt: true},
    scene: MainScene,
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.addEventListener("load", () => {
    new Game(config);
});
