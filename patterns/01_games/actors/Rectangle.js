export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render(ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(deltaTime) {
        this.x += 20 * deltaTime; // Move right at 50 pixels per second
        this.y += 10 * deltaTime; // Move down at 20 pixels per second
        // Wrap around the canvas
        if (this.x > 800)
            this.x = -100;
        if (this.y > 600)
            this.y = -100;
    }
}
