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
const player = { x:150, y:0, w:40, h:40, dy:0, gravity:0.7, jumpPower:-14, onGround:false, type:'cube' };
let gameOver=false, levelComplete=false, scrollSpeed=6;

// ===== Level Data =====
let obstacles = [
    { x:800,  w:50, h:100 },
    { x:1200, w:50, h:140 },
    { x:1600, w:50, h:110 },
    { x:2000, w:50, h:160 },
    { x:2600, w:60, h:120 },
    { x:3300, w:50, h:100 }
];

let portals = [
    { x:1000, type:'ship' },
    { x:2200, type:'ball' },
    { x:3000, type:'ufo' },
    { x:3600, type:'cube' }
];

const levelEndX = 3800;

// ===== Input =====
let keyPressed=false;
document.addEventListener("keydown", e => { if(e.code==="Space") keyPressed=true });
document.addEventListener("keyup", e => { if(e.code==="Space") keyPressed=false });
document.addEventListener("mousedown", () => keyPressed=true);
document.addEventListener("mouseup", () => keyPressed=false);

function handleJump() {
    if(player.type==='cube' && player.onGround){ player.dy = player.jumpPower; player.onGround=false; }
    else if(player.type==='ball'){ player.gravity*=-1; player.dy = player.jumpPower*Math.sign(player.gravity); }
    else if(player.type==='ufo'){ if(!player.onGround) player.dy = player.jumpPower/2; }
    else if(player.type==='ship'){ player.dy = -scrollSpeed*0.7; }
}

// ===== Editor =====
let editorMode = null; // 'obstacle' or 'portal'
function toggleEditor(){ 
    const panel = document.getElementById('editorPanel');
    panel.style.display = panel.style.display==='none'?'block':'none'; 
    editorMode = null;
}
function setEditorMode(mode){ editorMode = mode; }

canvas.addEventListener('click', e=>{
    if(!editorMode) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left + scrollSpeed*50; // place ahead of view
    const y = e.clientY - rect.top;
    if(editorMode==='obstacle'){
        obstacles.push({ x:x, w:50, h:Math.min(200, canvas.height-y-80) });
    } else if(editorMode==='portal'){
        const type = document.getElementById('portalType').value;
        portals.push({ x:x, type:type });
    }
});

function saveLevel(){
    const levelData = { obstacles, portals };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(levelData));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download","level.json");
    dlAnchor.click();
}

function loadLevel(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e=>{
        const data = JSON.parse(e.target.result);
        obstacles = data.obstacles || [];
        portals = data.portals || [];
    };
    reader.readAsText(file);
}

// ===== Game Loop =====
function update(){
    if(gameOver || levelComplete) return;
    if(keyPressed) handleJump();

    player.dy += player.gravity;
    player.y += player.dy;
    const ground = canvas.height-80;

    if(player.type!=='ship'){
        if((player.gravity>0 && player.y+player.h>=ground) || (player.gravity<0 && player.y<=0)){
            player.y = player.gravity>0 ? ground-player.h : 0;
            player.dy=0;
            player.onGround=true;
        } else player.onGround=false;
    }

    obstacles.forEach(ob=> ob.x -= scrollSpeed);

    obstacles.forEach(ob=>{
        const obRect = { x:ob.x, y:ground-ob.h, w:ob.w, h:ob.h };
        if(isColliding(player, obRect)) triggerGameOver();
    });

    portals.forEach(portal=>{
        if(Math.abs(player.x-portal.x)<scrollSpeed*2){
            player.type=portal.type;
            player.gravity = portal.type==='ball'?-0.7:0.7;
        }
    });

    if(player.x>levelEndX-(scrollSpeed*(levelEndX/800))) triggerWin();

    draw();
    requestAnimationFrame(update);
}

function draw(){
    c.clearRect(0,0,canvas.width,canvas.height);
    const ground = canvas.height-80;
    c.fillStyle="#222"; c.fillRect(0,ground,canvas.width,80);

    const colors = { cube:"#00ccff", ship:"#ff9900", ball:"#33ff66", ufo:"#cc33ff" };
    c.fillStyle = colors[player.type];
    c.fillRect(player.x,player.y,player.w,player.h);

    c.fillStyle="#ff3366";
    obstacles.forEach(ob=> c.fillRect(ob.x,ground-ob.h,ob.w,ob.h));

    portals.forEach(portal=>{
        c.fillStyle = colors[portal.type];
        c.beginPath();
        c.arc(portal.x,ground-20,20,0,Math.PI*2);
        c.fill();
        c.strokeStyle="#fff"; c.stroke();
    });

    c.fillStyle="#fff";
    c.fillRect(0,0,(player.x/levelEndX)*canvas.width,3);
}

// ===== Collision Detection =====
function isColliding(a,b){
    return a.x<b.x+b.w && a.x+a.w>b.x && a.y<b.y+b.h && a.y+a.h>b.y;
}

// ===== Game Over / Win =====
const msg = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

function triggerGameOver(){ gameOver=true; msg.textContent="Game Over!"; msg.style.opacity=1; restartBtn.style.display="block"; }
function triggerWin(){ levelComplete=true; msg.textContent="Level Complete!"; msg.style.opacity=1; restartBtn.style.display="block"; }

// ===== Restart =====
function restartGame(){
    obstacles = [ { x:800, w:50, h:100 }, { x:1200, w:50, h:140 }, { x:1600, w:50, h:110 }, { x:2000, w:50, h:160 }, { x:2600, w:60, h:120 }, { x:3300, w:50, h:100 } ];
    portals = [ { x:1000, type:'ship' }, { x:2200, type:'ball' }, { x:3000, type:'ufo' }, { x:3600, type:'cube' } ];
    player.y=0; player.dy=0; player.type='cube'; player.gravity=0.7; player.onGround=false;
    msg.style.opacity=0; restartBtn.style.display='none';
    gameOver=false; levelComplete=false;
    update();
}

update();
