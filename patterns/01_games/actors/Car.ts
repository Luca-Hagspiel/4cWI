import { Actor } from "./Actor";

export class Car implements Actor {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
  ) {}

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(deltaTime: number): void {
    this.x += 50 * deltaTime; // Move right at 50 pixels per second

    // Wrap around the canvas
    if (this.x > 800) this.x = -this.width;
  }
}
