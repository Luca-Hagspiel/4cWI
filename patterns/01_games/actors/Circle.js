export class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    render(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    update(deltaTime) {
        this.x -= 30 * deltaTime; // Move right at 30 pixels per second
        this.y -= 15 * deltaTime; // Move down at 15 pixels per second
        // Wrap around the canvas
        if (this.x - this.radius > 800)
            this.x = -this.radius;
        if (this.y - this.radius > 600)
            this.y = -this.radius;
    }
}
