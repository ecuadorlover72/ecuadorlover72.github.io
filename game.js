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
    jumpPower: -14,
    onGround: false,
    type: 'cube' // cube, ship, ball, ufo
};

// ===== Game Settings =====
let gameOver = false;
let levelComplete = false;
let scrollSpeed = 6;

// ===== Level Data =====
// Obstacles: x position, width, height
let obstacles = [
    { x: 800,  w: 50, h: 100 },
    { x: 1200, w: 50, h: 140 },
    { x: 1600, w: 50, h: 110 },
    { x: 2000, w: 50, h: 160 },
    { x: 2600, w: 60, h: 120 },
    { x: 3300, w: 50, h: 100 }
];

// Portals: x, type
let portals = [
    { x: 1000, type: 'ship' },
    { x: 2200, type: 'ball' },
    { x: 3000, type: 'ufo' },
    { x: 3600, type: 'cube' } // back to cube
];

const levelEndX = 3800;

// ===== Input =====
let keyPressed = false;
document.addEventListener("keydown", e => {
    if (e.code === "Space") keyPressed = true;
});
document.addEventListener("keyup", e => {
    if (e.code === "Space") keyPressed = false;
});
document.addEventListener("mousedown", () => keyPressed = true);
document.addEventListener("mouseup", () => keyPressed = false);

function handleJump() {
    if (player.type === 'cube' && player.onGround) {
        player.dy = player.jumpPower;
        player.onGround = false;
    } else if (player.type === 'ball') {
        // invert gravity
        player.gravity *= -1;
        player.dy = player.jumpPower * Math.sign(player.gravity);
    } else if (player.type === 'ufo') {
        if (!player.onGround) player.dy = player.jumpPower / 2;
    } else if (player.type === 'ship') {
        // continuous movement
        player.dy = -scrollSpeed * 0.7;
    }
}

// ===== Game Loop =====
function update() {
    if (gameOver || levelComplete) return;

    // Input
    if (keyPressed) handleJump();

    // Gravity
    player.dy += player.gravity;
    player.y += player.dy;

    const ground = canvas.height - 80;

    // Cube / UFO / Ball collision with ground
    if (player.type !== 'ship') {
        if ((player.gravity > 0 && player.y + player.h >= ground) ||
            (player.gravity < 0 && player.y <= 0)) {
            player.y = player.gravity > 0 ? ground - player.h : 0;
            player.dy = 0;
            player.onGround = true;
        } else {
            player.onGround = false;
        }
    }

    // Move obstacles
    obstacles.forEach(ob => ob.x -= scrollSpeed);

    // Collision detection
    obstacles.forEach(ob => {
        const obRect = { x: ob.x, y: ground - ob.h, w: ob.w, h: ob.h };
        if (isColliding(player, obRect)) triggerGameOver();
    });

    // Portals
    portals.forEach(portal => {
        if (Math.abs(player.x - portal.x) < scrollSpeed * 2) {
            player.type = portal.type;
            // Reset gravity for modes
            player.gravity = (portal.type === 'ball' ? -0.7 : 0.7);
        }
    });

    // Level completion
    if (player.x > levelEndX - (scrollSpeed * (levelEndX / 800))) triggerWin();

    draw();
    requestAnimationFrame(update);
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    const ground = canvas.height - 80;

    // Ground
    c.fillStyle = "#222";
    c.fillRect(0, ground, canvas.width, 80);

    // Player color by type
    const colors = { cube: "#00ccff", ship: "#ff9900", ball: "#33ff66", ufo: "#cc33ff" };
    c.fillStyle = colors[player.type];
    c.fillRect(player.x, player.y, player.w, player.h);

    // Obstacles
    c.fillStyle = "#ff3366";
    obstacles.forEach(ob => {
        c.fillRect(ob.x, ground - ob.h, ob.w, ob.h);
    });

    // Portals
    portals.forEach(portal => {
        c.fillStyle = colors[portal.type];
        c.beginPath();
        c.arc(portal.x, ground - 20, 20, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = "#fff";
        c.stroke();
    });

    // Progress bar
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
    // Reset obstacles and portals
    obstacles = [
        { x: 800,  w: 50, h: 100 },
        { x: 1200, w: 50, h: 140 },
        { x: 1600, w: 50, h: 110 },
        { x: 2000, w: 50, h: 160 },
        { x: 2600, w: 60, h: 120 },
        { x: 3300, w: 50, h: 100 }
    ];

    portals = [
        { x: 1000, type: 'ship' },
        { x: 2200, type: 'ball' },
        { x: 3000, type: 'ufo' },
        { x: 3600, type: 'cube' }
    ];

    player.y = 0;
    player.dy = 0;
    player.type = 'cube';
    player.gravity = 0.7;
    player.onGround = false;

    msg.style.opacity = 0;
    restartBtn.style.display = "none";

    gameOver = false;
    levelComplete = false;

    update();
}

update();
