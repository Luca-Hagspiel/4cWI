// MyGame - Example implementation of Game interface
import { Game, GameFramework } from "./GameFramework.js";
import { Rectangle } from "./actors/Rectangle.js";
import { Circle } from "./actors/Circle.js";
import { Car } from "./actors/Car.js";
class MyGame extends Game {
    constructor() {
        super(...arguments);
        this.actors = [];
    }
    init() {
        console.log("Game started!");
        this.actors.push(new Rectangle(50, 50, 100, 100));
        this.actors.push(new Rectangle(200, 150, 150, 150));
        this.actors.push(new Circle(400, 300, 30));
        this.actors.push(new Circle(600, 400, 50));
        this.actors.push(new Circle(700, 400, 50));
        this.actors.push(new Car(100, 500, 100, 50));
    }
    update(deltaTime) {
        this.actors.forEach((actor) => actor.update(deltaTime));
    }
    render(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.actors.forEach((actor) => actor.render(ctx));
    }
}
const game = new MyGame();
const framework = new GameFramework(game, 800, 600);
framework.start();
console.log("test");
