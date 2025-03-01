document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('overlay');
    const overlayMessage = document.getElementById('overlayMessage');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    //const exploreGameButton = document.getElementById("exploreGameButton");

    let player = { x: 50, y: canvas.height / 2, radius: 25, color: 'yellow', face: ':|', dy: 0, speed: 6 };
    let obstacles = [];
    let frame = 0;
    let speed = 5;
    const initialSpeed = 9;
    const maxSpeed = 15;
    let obstacleFrequency = 100;
    let gapSize = 150;
    let gameActive = false;
    const maxPlayTime = 25;
    const fps = 60;

    function preventPageScroll(event) {
        if (gameActive && ["ArrowUp", "ArrowDown"].includes(event.key)) {
            event.preventDefault();  // 🔥 게임이 실행 중일 때만 스크롤 방지
        }
    }

    function drawPlayer() {
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
        ctx.fillStyle = player.color;
        ctx.fill();
        ctx.closePath();
        
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(Math.PI / 2);
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(player.face, 0, 0);
        ctx.restore();
    }

    function createObstacle() {
        const height = Math.random() * (canvas.height - gapSize - 50) + 50;
        obstacles.push({ x: canvas.width, y: 0, width: 30, height: height, color: 'brown' });
        obstacles.push({ x: canvas.width, y: height + gapSize, width: 30, height: canvas.height - height - gapSize, color: 'brown' });
    }

    function drawObstacles() {
        obstacles.forEach(obstacle => {
            ctx.fillStyle = obstacle.color;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    function moveObstacles() {
        obstacles.forEach(obstacle => { obstacle.x -= speed; });
        obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    }

    function detectCollision() {
        for (let obstacle of obstacles) {
            const closestX = Math.max(obstacle.x, Math.min(player.x, obstacle.x + obstacle.width));
            const closestY = Math.max(obstacle.y, Math.min(player.y, obstacle.y + obstacle.height));
            if (Math.sqrt((closestX - player.x) ** 2 + (closestY - player.y) ** 2) <= player.radius) {
                player.face = ':(';
                updateCanvas();
                gameOver('Game Over! Play again?');
                return;
            }
        }
    }

    function updatePlayer() {
        player.y += player.dy;
        if (player.y - player.radius < 0) player.y = player.radius;
        if (player.y + player.radius > canvas.height) player.y = canvas.height - player.radius;
    }

    function resetGame() {
        obstacles = [];
        frame = 0;
        speed = initialSpeed;
        gapSize = 150;
        obstacleFrequency = 100;
        player.y = canvas.height / 2;
        player.face = ':|';
        gameActive = true;
        updateGame();
    }

    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawObstacles();
    }

    function updateGame() {
        if (!gameActive) return;
        frame++;
        updateCanvas();
        if (frame % obstacleFrequency === 0) createObstacle();
        moveObstacles();
        detectCollision();
        updatePlayer();
        if (speed < maxSpeed && frame % (fps * 2) === 0) speed += 0.5;
        if (frame % (fps * 5) === 0 && obstacleFrequency > 50) obstacleFrequency -= 10;
        if (gapSize > 100 && frame % (fps * 2.5) === 0) gapSize -= 5;
        if (frame / fps >= maxPlayTime) {
            gameActive = false;
            player.face = ':)';
            obstacles = [];
            updateCanvas();
            gameOver('Success! Play again?');
        }
        requestAnimationFrame(updateGame);
    }

    function positionOverlay() {
        const gameContainer = document.getElementById('gameContainer');
        const overlay = document.getElementById('overlay');
    
        overlay.style.top = `${gameContainer.clientHeight / 2}px`;
        overlay.style.left = `${gameContainer.clientWidth / 2}px`;
        overlay.style.transform = 'translate(-50%, -50%)';
        overlay.style.display = 'block';
    }

    function gameOver(message) {
        positionOverlay();
        gameActive = false;
        overlayMessage.textContent = message;
        overlay.style.display = 'block';
    }

    function startGame() {
        positionOverlay();
        overlayMessage.textContent = 'Do you want to start the game?';
        overlay.style.display = 'block';

        yesButton.onclick = () => {
            overlay.style.display = 'none';
            gameActive = true;
            resetGame();
        };
        noButton.onclick = () => overlay.style.display = 'none';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') player.dy = -player.speed;
        else if (e.key === 'ArrowDown') player.dy = player.speed;
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player.dy = 0;
    });

    // 🔥 키보드 입력 시 기본 스크롤 방지 (게임 실행 중일 때만)
    window.addEventListener("keydown", preventPageScroll);

    startGame();

    /*exploreGameButton.addEventListener("click", function () {
        window.location.href = "gameList.html"; // 새로운 게임 리스트 페이지로 이동
    });*/
});
