import { Game, GameFramework } from "./GameFramework.js";
import { Viereck } from "./class/viereck.js";
import { Circle } from "./class/circle.js";
class MyGame extends Game {
    constructor() {
        super(...arguments);
        this.actors = [];
    }
    init() {
        console.log("Game started!");
        this.actors.push(new Viereck(50, 50, 100, 100, 50, "red"));
        this.actors.push(new Viereck(50, 50, 100, 100, 100, "blue"));
        this.actors.push(new Circle(400, 300, 30, "green", 100));
        this.actors.push(new Circle(400, 300, 30, "yellow", 200));
    }
    update(deltaTime) {
        this.actors.forEach((actor) => actor.update(deltaTime));
    }
    render(ctx) {
        this.actors.forEach((actor) => actor.render(ctx));
    }
}
const game = new MyGame();
const framework = new GameFramework(game, 800, 600);
framework.start();
