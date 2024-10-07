const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grid = 20;
let snake = [{x: 160, y: 160}];
let dx = grid;
let dy = 0;
let apple = {x: 320, y: 320};
let score = 0;
let speed = 15;  // Устанавливаем скорость змейки

function gameLoop() {
    setTimeout(function () {
        requestAnimationFrame(gameLoop);

        if (++score < speed) return;  // Задержка, чем выше значение speed, тем медленнее
        score = 0;

        // Перемещение змейки
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        if (head.x === apple.x && head.y === apple.y) {
            // Если съели яблоко, генерируем новое
            apple.x = Math.floor(Math.random() * 20) * grid;
            apple.y = Math.floor(Math.random() * 20) * grid;
        } else {
            snake.pop();
        }

        // Проверка выхода за границы
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            resetGame();
        }

        // Проверка столкновения с собой
        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                resetGame();
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Рисуем клетчатый фон
        ctx.fillStyle = '#bada55'; // Основной цвет фона
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#9acd32';
        for (let x = 0; x < canvas.width; x += grid) {
            for (let y = 0; x < canvas.height; y += grid) {
                ctx.strokeRect(x, y, grid, grid);
            }
        }

        // Рисуем змейку
        snake.forEach(part => {
            ctx.fillStyle = 'blue';  // Цвет змейки
            ctx.fillRect(part.x, part.y, grid, grid);
        });

        // Рисуем яблоко
        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x, apple.y, grid, grid);
    }, 150);  // Чем больше значение, тем медленнее змейка
}

function resetGame() {
    snake = [{x: 160, y: 160}];
    dx = grid;
    dy = 0;
}

document.addEventListener('keydown', e => {
    if (e.code === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -grid;
    } else if (e.code === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = grid;
    } else if (e.code === 'ArrowLeft' && dx === 0) {
        dx = -grid;
        dy = 0;
    } else if (e.code === 'ArrowRight' && dx === 0) {
        dx = grid;
        dy = 0;
    }
});

requestAnimationFrame(gameLoop);
