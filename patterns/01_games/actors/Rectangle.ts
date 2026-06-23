import { Actor } from "./Actor.js";
export class Rectangle implements Actor {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
  ) {}

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(deltaTime: number): void {
    this.x += 20 * deltaTime; // Move right at 50 pixels per second
    this.y += 10 * deltaTime; // Move down at 20 pixels per second

    // Wrap around the canvas
    if (this.x > 800) this.x = -100;
    if (this.y > 600) this.y = -100;
  }
}
