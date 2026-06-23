import { Actor } from "./Actor.js";
export class Circle implements Actor {
  constructor(
    private x: number,
    private y: number,
    private radius: number,
  ) {}

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update(deltaTime: number): void {
    this.x -= 30 * deltaTime; // Move right at 30 pixels per second
    this.y -= 15 * deltaTime; // Move down at 15 pixels per second

    // Wrap around the canvas
    if (this.x - this.radius > 800) this.x = -this.radius;
    if (this.y - this.radius > 600) this.y = -this.radius;
  }
}
