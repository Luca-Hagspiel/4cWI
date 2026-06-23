import { Actors} from "./Actors";

export class Circle implements Actors{
    constructor(
        private x: number,
        private y: number,
        private radius: number,
        private color: string,
        private speed: number,
    ) {}

    render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(deltaTime: number): void {
        this.x -= this.speed * deltaTime;
        this.y -= this.speed * deltaTime;

        if (this.x + this.radius < 0) this.x = 800 + this.radius;
        if (this.y + this.radius < 0) this.y = 600 + this.radius;
    }
}