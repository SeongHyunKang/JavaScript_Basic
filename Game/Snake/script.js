$(document).ready(function() {
    const gameArea = $('#game-area');
    const gameWidth = gameArea.width();
    const gameHeight = gameArea.height();
    const snakeSize = 20;
    let snake = [];
    let direction = { x: 0, y: 0 };
    let newDirection = null;
    let directionChanged = false;
    let foodPosition = { top: 0, left: 0 };
    let score = 0;
    let gameInterval;
    let timerInterval;
    let timeSurvived = 0;
    let gameStarted = false;

    function placeFood() {
        let foodPlaced = false;
        while (!foodPlaced) {
            foodPosition.top = Math.round(Math.random() * (gameHeight - snakeSize) / snakeSize) * snakeSize;
            foodPosition.left = Math.round(Math.random() * (gameWidth - snakeSize) / snakeSize) * snakeSize;
    
            let collision = snake.some(segment => {
                return foodPosition.top === segment.top && foodPosition.left === segment.left;
            });
    
            if (!collision) {
                foodPlaced = true;
            }
        }
        $('#food').css(foodPosition);
    }

    function drawSnake() {
        $('#snake').empty();
        snake.forEach((segment, index) => {
            const segmentDiv = $('<div></div>').addClass('snake-segment');
            if (index === 0) {
                segmentDiv.addClass('snake-head');
            }
            segmentDiv.css({ top: segment.top + 'px', left: segment.left + 'px' });
            $('#snake').append(segmentDiv);
        });
    }

    function moveSnake() {
        const newHead = { top: snake[0].top + (direction.y * snakeSize), left: snake[0].left + (direction.x * snakeSize) };
        snake.unshift(newHead);
        if (newHead.top === foodPosition.top && newHead.left === foodPosition.left) {
            score += 10;
            placeFood();
        } else {
            snake.pop();
        }
        if (checkCollision(newHead)) {
            resetGame();
        } else {
            drawSnake();
            $('#score').text(score);
        }
        updateDirection();
    }

    function checkCollision(head) {
        if (head.left < 0 || head.top < 0 || head.left >= gameWidth || head.top >= gameHeight) {
            return true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (head.left === snake[i].left && head.top === snake[i].top) {
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        snake = [{ top: Math.floor((gameHeight - snakeSize) / 2), left: Math.floor((gameWidth - snakeSize) / 2) }];
        direction = { x: 0, y: 0 };
        newDirection = null;
        directionChanged = false;
        score = 0;
        timeSurvived = 0;
        gameStarted = false;
        $('#score').text(score);
        $('#time').text(timeSurvived);
        placeFood();
        drawSnake();
    }

    function updateDirection() {
        if (newDirection !== null) {
            direction = newDirection;
            newDirection = null;
            directionChanged = false;
        }
    }

    $(document).keydown(function(e) {
        if (!gameStarted) {
            gameStarted = true;
            gameInterval = setInterval(moveSnake, 100);
            timerInterval = setInterval(function() {
                timeSurvived++;
                $('#time').text(timeSurvived);
            }, 1000);
        }

        if (directionChanged) {
            return;
        }

        const newDir = { x: direction.x, y: direction.y };

        if (e.which === 37 && direction.x !== 1) {
            newDir.x = -1; newDir.y = 0;
        } else if (e.which === 38 && direction.y !== 1) {
            newDir.x = 0; newDir.y = -1;
        } else if (e.which === 39 && direction.x !== -1) {
            newDir.x = 1; newDir.y = 0;
        } else if (e.which === 40 && direction.y !== -1) {
            newDir.x = 0; newDir.y = 1;
        }

        if (direction.x !== newDir.x || direction.y !== newDir.y) {
            newDirection = newDir;
            directionChanged = true;
        }

        e.preventDefault();
    });

    resetGame();
});
