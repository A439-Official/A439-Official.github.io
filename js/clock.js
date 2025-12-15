class DigitalClock {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.angl_map = {
            "┌": [0, 90],
            "┐": [90, 180],
            "┘": [180, 270],
            "└": [0, 270],
            "─": [0, 180],
            "│": [90, 270],
            " ": [135, 135],
        };

        this.numbers = {
            0: ["┌──┐", "│┌┐│", "││││", "││││", "│└┘│", "└──┘"],
            1: ["  ┌┐", "  ││", "  ││", "  ││", "  ││", "  └┘"],
            2: ["┌──┐", "└─┐│", "┌─┘│", "│┌─┘", "│└─┐", "└──┘"],
            3: ["┌──┐", "└─┐│", "┌─┘│", "└─┐│", "┌─┘│", "└──┘"],
            4: ["┌┐┌┐", "││││", "│└┘│", "└─┐│", "  ││", "  └┘"],
            5: ["┌──┐", "│┌─┘", "│└─┐", "└─┐│", "┌─┘│", "└──┘"],
            6: ["┌──┐", "│┌─┘", "│└─┐", "│┌┐│", "│└┘│", "└──┘"],
            7: ["┌──┐", "└─┐│", "  ││", "  ││", "  ││", "  └┘"],
            8: ["┌──┐", "│┌┐│", "│└┘│", "│┌┐│", "│└┘│", "└──┘"],
            9: ["┌──┐", "│┌┐│", "│└┘│", "└─┐│", "  ││", "  └┘"],
        };

        this.animationState = {
            currentTime: "",
            targetTime: "",
            progress: 0,
            animationSpeed: 0.05,
        };
    }

    bezier(t, p1, p2, p3, p4) {
        return Math.pow(1 - t, 3) * p1 + 3 * Math.pow(1 - t, 2) * t * p2 + 3 * (1 - t) * Math.pow(t, 2) * p3 + Math.pow(t, 3) * p4;
    }

    getTimeBasedAngles(number, ix, iy) {
        if (!(number in this.numbers)) {
            return [(this.angl_map[" "][0] * Math.PI) / 180, (this.angl_map[" "][1] * Math.PI) / 180];
        }
        const str = this.numbers[number][iy][ix];
        const angle1 = this.angl_map[str][0];
        const angle2 = this.angl_map[str][1];
        return [(angle1 * Math.PI) / 180, (angle2 * Math.PI) / 180];
    }

    interpolateAngles(startAngles, endAngles, progress) {
        const easedProgress = this.bezier(progress, 0, 1, 1, 1);
        const [start1, start2] = startAngles;
        const [end1, end2] = endAngles;

        function shortestAngle(from, to) {
            const difference = to - from;
            return ((difference + Math.PI) % (2 * Math.PI)) - Math.PI;
        }

        const angle1 = start1 + shortestAngle(start1, end1) * easedProgress;
        const angle2 = start2 + shortestAngle(start2, end2) * easedProgress;
        return [angle1, angle2];
    }

    drawDigit(digit, prevDigit, x, y, w, h, progress) {
        const s = w / 4;
        this.ctx.fillStyle = "#0000007f";
        this.ctx.fillRect(x, y, w, h);

        for (let ix = 0; ix < 4; ix++) {
            for (let iy = 0; iy < 6; iy++) {
                const xx = x + s * ix;
                const yy = y + s * iy;
                const center = {
                    x: xx + s / 2,
                    y: yy + s / 2,
                };
                const currentAngles = this.getTimeBasedAngles(digit, ix, iy);
                const prevAngles = prevDigit !== null ? this.getTimeBasedAngles(prevDigit, ix, iy) : currentAngles;
                const [angle1, angle2] = this.interpolateAngles(prevAngles, currentAngles, progress);

                this.ctx.strokeStyle = "#ffff7f";
                this.ctx.beginPath();
                this.ctx.lineWidth = 4;
                this.ctx.moveTo(center.x, center.y);
                this.ctx.lineTo(center.x + (Math.cos(angle1) * s) / 2, center.y + (Math.sin(angle1) * s) / 2);
                this.ctx.moveTo(center.x, center.y);
                this.ctx.lineTo(center.x + (Math.cos(angle2) * s) / 2, center.y + (Math.sin(angle2) * s) / 2);
                this.ctx.stroke();
            }
        }
    }

    updateTime() {
        const now = new Date();
        const timeString = now
            .toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
            .replace(/\D/g, " ");

        if (this.animationState.targetTime !== timeString) {
            this.animationState.currentTime = this.animationState.targetTime || timeString;
            this.animationState.targetTime = timeString;
            this.animationState.progress = 0;
        }

        if (this.animationState.progress < 1) {
            this.animationState.progress += this.animationState.animationSpeed;
            if (this.animationState.progress > 1) {
                this.animationState.progress = 1;
                this.animationState.currentTime = this.animationState.targetTime;
            }
        }

        const cw = this.canvas.clientWidth;
        const ch = this.canvas.clientHeight;
        this.canvas.width = cw;
        this.canvas.height = ch;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const timeStringLength = this.animationState.targetTime.length;
        const totalSpacingWidth = 0.25 * (timeStringLength - 1);
        const w = this.canvas.width / (timeStringLength + totalSpacingWidth);
        const h = w / (4 / 6);
        const spacing = w * 0.25;

        for (let i = 0; i < timeStringLength; i++) {
            const targetDigit = parseInt(this.animationState.targetTime[i]);
            const currentDigit = this.animationState.currentTime ? parseInt(this.animationState.currentTime[i]) : targetDigit;

            if (isNaN(targetDigit)) continue;

            const x = i * (w + spacing);
            const y = (this.canvas.height - h) / 2;

            this.drawDigit(targetDigit, currentDigit, x, y, w, h, this.animationState.progress);
        }
    }

    start() {
        const animate = () => {
            this.updateTime();
            requestAnimationFrame(animate);
        };
        animate();
    }
}
