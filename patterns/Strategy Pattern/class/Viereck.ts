import { Actors } from "./Actors";

export class Viereck implements Actors {
    constructor(
        private x: number,
        private y: number,
        private width: number,
        private height: number,
        private speed: number,
        private color: string
    ) {}

    render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(deltaTime: number): void {
        this.x += this.speed * deltaTime;
        this.y += this.speed * deltaTime;

        // Wrap around the canvas
        if (this.x > 800) this.x = -this.width;
        if (this.y > 800) this.y = -this.height;
    }
}