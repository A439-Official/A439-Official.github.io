class ParticleSystem {
    constructor(numPoints, canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.points = [];
        this.init(numPoints);
        window.addEventListener("resize", () => this.resizeCanvas());
        this.resizeCanvas();
    }
 
    init(numPoints) {
        this.points = [];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        for (let i = 0; i < numPoints; i++) {
            this.points.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2,
            });
        }
    }
 
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
 
    update() {
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            // 随机速度扰动
            p.dx += (Math.random() - 0.5) * 0.25;
            p.dy += (Math.random() - 0.5) * 0.25;
            // 速度衰减
            p.dx *= 0.999;
            p.dy *= 0.999;
            // 碰撞检测
            for (let j = i + 1; j < this.points.length; j++) {
                const p2 = this.points[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.hypot(dx, dy);
                const minDistThreshold = 20;
                const repulsionStrength = 0.1;
                if (dist < minDistThreshold) {
                    const force = repulsionStrength / (dist || 1);
                    p.dx += dx * force;
                    p.dy += dy * force;
                    p2.dx -= dx * force;
                    p2.dy -= dy * force;
                }
            }
            // 边界检测
            p.x = mod(p.x + p.dx, this.canvas.width);
            p.y = mod(p.y + p.dy, this.canvas.height);
        }
    }
 
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            let minDist = Infinity;
            for (let j = i + 1; j < this.points.length; j++) {
                const p2 = this.points[j];
                const dx = p2.x - p.x;
                const dy = p2.y - p.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 100) {
                    const alpha = Math.max(0, 1 - dist / 100);
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    this.ctx.stroke();
                }
                minDist = Math.min(minDist, dist);
            }
            if (minDist < 100) {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${1 - minDist / 100})`;
                this.ctx.fill();
            }
        }
    }
 
    render() {
        this.update();
        this.draw();
    }
}