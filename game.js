// ===== Canvas Setup =====
const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// ===== Player =====
const player = {
    x: 150,
    y: 0,
    w: 40,
    h: 40,
    dy: 0,
    gravity: 0.7,
    jumpPower: -15,
    onGround: false
};

let gameOver = false;
let levelComplete = false;
let scrollSpeed = 6;

// ===== Level Data =====
// Rectangular obstacles: x position, width, height
let obstacles = [
    { x: 800,  w: 50, h: 100 },
    { x: 1200, w: 50, h: 150 },
    { x: 1600, w: 50, h: 120 },
    { x: 2000, w: 50, h: 200 },
    { x: 2600, w: 60, h: 250 },
    { x: 3300, w: 50, h: 100 } // final obstacle
];

const levelEndX = 3800; // reach here = win

// ===== Input =====
let jumped = false;
document.addEventListener("keydown", e => {
    if (e.code === "Space") jump();
});
document.addEventListener("mousedown", jump);

function jump() {
    if (player.onGround && !gameOver && !levelComplete) {
        player.dy = player.jumpPower;
        player.onGround = false;
    }
}

// ===== Game Loop =====
function update() {
    if (gameOver || levelComplete) return;

    // Gravity
    player.dy += player.gravity;
    player.y += player.dy;

    // Ground Collision
    const ground = canvas.height - 80;
    if (player.y + player.h >= ground) {
        player.y = ground - player.h;
        player.dy = 0;
        player.onGround = true;
    }

    // Move and check collisions
    obstacles.forEach(ob => {
        ob.x -= scrollSpeed;
        if (isColliding(player, {
            x: ob.x, y: ground - ob.h, w: ob.w, h: ob.h
        })) {
            triggerGameOver();
        }
    });

    // Level completion
    if (player.x > levelEndX - (scrollSpeed * (levelEndX / 800))) {
        triggerWin();
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Ground
    c.fillStyle = "#222";
    c.fillRect(0, canvas.height - 80, canvas.width, 80);

    // Player
    c.fillStyle = "#00ccff";
    c.fillRect(player.x, player.y, player.w, player.h);

    // Obstacles
    c.fillStyle = "#ff3366";
    obstacles.forEach(ob => {
        c.fillRect(ob.x, canvas.height - 80 - ob.h, ob.w, ob.h);
    });

    // Progress line (optional)
    c.fillStyle = "#fff";
    c.fillRect(0, 0, (player.x / levelEndX) * canvas.width, 3);
}

// ===== Collision Detection =====
function isColliding(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

// ===== Game Over =====
const msg = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

function triggerGameOver() {
    gameOver = true;
    msg.textContent = "Game Over!";
    msg.style.opacity = 1;
    restartBtn.style.display = "block";
}

function triggerWin() {
    levelComplete = true;
    msg.textContent = "Level Complete!";
    msg.style.opacity = 1;
    restartBtn.style.display = "block";
}

// ===== Restart =====
function restartGame() {
    obstacles = obstacles.map((ob, i) => ({
        ...ob,
        x: 800 + i * 400
    }));

    msg.style.opacity = 0;
    restartBtn.style.display = "none";

    player.y = 0;
    player.dy = 0;

    gameOver = false;
    levelComplete = false;

    update();
}

update();
