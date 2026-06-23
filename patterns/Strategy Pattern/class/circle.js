export class Circle {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    update(deltaTime) {
        this.x -= this.speed * deltaTime;
        this.y -= this.speed * deltaTime;
        if (this.x + this.radius < 0)
            this.x = 800 + this.radius;
        if (this.y + this.radius < 0)
            this.y = 600 + this.radius;
    }
}
