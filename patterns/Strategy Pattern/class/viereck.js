export class Viereck {
    constructor(x, y, width, height, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
    }
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(deltaTime) {
        this.x += this.speed * deltaTime;
        this.y += this.speed * deltaTime;
        // Wrap around the canvas
        if (this.x > 800)
            this.x = -this.width;
        if (this.y > 800)
            this.y = -this.height;
    }
}
