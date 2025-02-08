<script>
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
      pages.forEach(page => {
        page.classList.remove('active');
      });
      document.getElementById(pageId).classList.add('active');
    }

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const playButton = document.getElementById('playButton');
    const retryButton = document.getElementById('retryButton');

    let snake = [{ x: 160, y: 160 }];
    let direction = { x: 20, y: 0 };
    let food = { x: 200, y: 200 };
    let score = 0;
    let gameInterval;

    function drawSnake() {
      ctx.fillStyle = 'lime';
      snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20);
      });
    }

    function drawFood() {
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x, food.y, 20, 20);
    }

    function moveSnake() {
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
      } else {
        snake.pop();
      }
    }

    function placeFood() {
      food.x = Math.floor(Math.random() * 20) * 20;
      food.y = Math.floor(Math.random() * 20) * 20;
    }

    function checkCollision() {
      const head = snake[0];
      if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
      }
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          return true;
        }
      }
      return false;
    }

    function gameLoop() {
      if (checkCollision()) {
        endGame();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFood();
      moveSnake();
      drawSnake();
    }

    function startGame() {
      playButton.style.display = 'none';
      retryButton.style.display = 'none';
      canvas.style.display = 'block';
      snake = [{ x: 160, y: 160 }];
      direction = { x: 20, y: 0 };
      score = 0;
      placeFood();
      gameInterval = setInterval(gameLoop, 200);
    }

    function endGame() {
      clearInterval(gameInterval);
      alert(`Game Over! Your score: ${score}`);
      retryButton.style.display = 'block';
      canvas.style.display = 'none';
    }

    window.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction.y === 0) direction = { x: 0, y: -20 };
          break;
        case 'ArrowDown':
          if (direction.y === 0) direction = { x: 0, y: 20 };
          break;
        case 'ArrowLeft':
          if (direction.x === 0) direction = { x: -20, y: 0 };
          break;
        case 'ArrowRight':
          if (direction.x === 0) direction = { x: 20, y: 0 };
          break;
      }
    });

    playButton.addEventListener('click', startGame);
    retryButton.addEventListener('click', startGame);
  </script>