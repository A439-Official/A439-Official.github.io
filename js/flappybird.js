const canvas = document.getElementById("canvas");
var gameRunning = false;
var pipes = [];
var lastUpdateTime = Date.now();
var score = 0;
var bird = { x: 0.1, y: 0.5, velocity: 0 };
var scoreboard = [];
function uploadScore(score) {
    fetch("/api/upload/flappybird", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: score }),
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error:", error));
}
function getScoreboard() {
    fetch("/api/get/flappybird")
        .then((response) => response.json())
        .then((data) => {
            scoreboard = data;
        })
        .catch((error) => console.error("Error:", error));
}
function init() {
    score = 0;
    bird.y = 0.5;
    gameRunning = true;
    bird.velocity = 0;
    pipes = [];
    newPipe(1);
    getScoreboard();
}
function dead() {
    uploadScore(score);
    gameRunning = false;
}
function newPipe(x) {
    var pipe = {
        x: x,
        y: 0.3 + Math.random() * 0.4,
        distance: 0.3 + Math.random() * 0.2,
        passed: false,
    };
    pipes.push(pipe);
}
function jump() {
    bird.velocity = -0.15;
}
function updatePipes(deltaTime) {
    for (var i = 0; i < pipes.length; i++) {
        pipes[i].x -= deltaTime * 0.05;
        if (!pipes[i].passed && pipes[i].x < bird.x) {
            if (Math.abs(bird.y - pipes[i].y) > 0.1) {
                dead();
            } else {
                pipes[i].passed = true;
                score++;
            }
        }
        if (pipes[i].x < -0.5) {
            pipes.splice(i, 1);
            i--;
        }
    }
}
function updateBird(deltaTime) {
    bird.y += bird.velocity * deltaTime;
    bird.velocity += 0.05 * deltaTime;
    if (bird.y < 0 || bird.y > 1) {
        dead();
    }
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function keyDown(event) {
    if (event.key === " ") {
        if (gameRunning) {
            jump();
        } else {
            init();
        }
    }
}
function click() {
    if (gameRunning) {
        jump();
    } else {
        init();
    }
}
function update() {
    var deltaTime = (Date.now() - lastUpdateTime) / 128;
    lastUpdateTime = Date.now();
    const ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var centerX = width / 2;
    var centerY = height / 2;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, width, height);
    ctx.closePath();
    if (pipes.length > 0) {
        for (var i = 0; i < pipes.length; i++) {
            var pipe = pipes[i];
            if (1 > pipe.x > 0) {
                ctx.beginPath();
                ctx.lineWidth = 5;
                if (pipe.passed) {
                    ctx.strokeStyle = "rgba(0,255,0,1)";
                } else {
                    ctx.strokeStyle = "rgba(255,0,0,1)";
                }
                ctx.moveTo(pipe.x * width, (pipe.y - 0.05) * height);
                ctx.lineTo(pipe.x * width, 0);
                ctx.stroke();
                ctx.moveTo(pipe.x * width, (pipe.y + 0.05) * height);
                ctx.lineTo(pipe.x * width, height);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    ctx.beginPath();
    ctx.arc(bird.x * width, bird.y * height, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.font = "30px Comfortaa";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 30);
    if (gameRunning) {
        updatePipes(deltaTime);
        updateBird(deltaTime);
        if (pipes.length > 0 && pipes[pipes.length - 1].x < 1) {
            newPipe(1 + pipes[pipes.length - 1].distance);
        }
    } else {
        ctx.beginPath();
        ctx.font = "50px Comfortaa";
        ctx.fillStyle = "white";
        ctx.fillText("Press Space to Start", centerX - 260, height - 50);
        ctx.closePath();
        ctx.beginPath();
        a = 0;
        for (var i = 0; i < scoreboard.length; i++) {
            ctx.font = "30px Comfortaa";
            ctx.fillStyle = "white";
            ctx.fillText(scoreboard[i].name + " - " + scoreboard[i].score, 10, centerY - 100 + i * 35);
        }
        ctx.closePath();
    }
    requestAnimationFrame(update);
}
requestAnimationFrame(update);
window.addEventListener("resize", resizeCanvas);
window.dispatchEvent(new Event("resize"));
addEventListener("keydown", keyDown);
addEventListener("touchstart", click);
getScoreboard();
