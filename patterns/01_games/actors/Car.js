export class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(deltaTime) {
        this.x += 50 * deltaTime; // Move right at 50 pixels per second
        // Wrap around the canvas
        if (this.x > 800)
            this.x = -this.width;
    }
}
