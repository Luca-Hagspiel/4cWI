export interface Actor {
  render(ctx: CanvasRenderingContext2D): void;
  update(deltaTime: number): void;
}
