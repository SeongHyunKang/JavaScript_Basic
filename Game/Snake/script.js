$(document).ready(function(){
    const gameArea = $('#game-area');
    const gameWidth = gameArea.width();
    const gameHeight = gameArea.height();
    const snakeSize = 20;
    let snake = [];
    let direction = { x: 0, y: 0 };
    let foodPosition = { top: 0, left: 0 };
    let score = 0;
    let gameInterval;
    let timerInterval;
    let timeSurvived = 0;
    let gameStarted = false;

    function placeFood() {
        foodPosition.top = Math.round(Math.random() * (gameHeight - snakeSize) / snakeSize) * snakeSize;
        foodPosition.left = Math.round(Math.random() * (gameWidth - snakeSize) / snakeSize) * snakeSize;
        $('#food').css(foodPosition);
    }

    function drawSnake() {
        $('#snake').empty(); // Remove the previous snake parts
        snake.forEach((segment, index) => {
            const segmentDiv = $('<div></div>');
            segmentDiv.addClass('snake-segment');
            if (index === 0) { // If it's the first segment, it's the head
                segmentDiv.addClass('snake-head');
            }
            segmentDiv.css({ top: segment.top + 'px', left: segment.left + 'px' });
            $('#snake').append(segmentDiv);
        });
    }

    function moveSnake() {
        const newHead = {
            top: snake[0].top + (direction.y * snakeSize),
            left: snake[0].left + (direction.x * snakeSize)
        };

        snake.unshift(newHead);
        if (snake[0].top === foodPosition.top && snake[0].left === foodPosition.left) {
            score += 10;
            placeFood();
        } else {
            snake.pop();
        }
        if (checkCollision(newHead)) {
            resetGame();
        }
        drawSnake();
        $('#score').text(score);
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
        snake = [{
            top: Math.floor((gameHeight - snakeSize) / 2),
            left: Math.floor((gameWidth - snakeSize) / 2)
        }];
        direction = { x: 0, y: 0 };
        score = 0;
        timeSurvived = 0;
        gameStarted = false;
        $('#score').text(score);
        $('#time').text(timeSurvived);
        placeFood();
        drawSnake();
    }

    $(document).keydown(function(e){
        if (e.which >= 37 && e.which <= 40) {
            e.preventDefault();
        }

        if (!gameStarted) {
            gameStarted = true;
            gameInterval = setInterval(moveSnake, 100);
            timerInterval = setInterval(function() {
                timeSurvived++;
                $('#time').text(timeSurvived);
            }, 1000);
        }
        if (e.which === 37 && direction.x !== 1) {
            direction = { x: -1, y: 0 };
        } else if (e.which === 38 && direction.y !== 1) {
            direction = { x: 0, y: -1 };
        } else if (e.which === 39 && direction.x !== -1) {
            direction = { x: 1, y: 0 };
        } else if (e.which === 40 && direction.y !== -1) {
            direction = { x: 0, y: 1 };
        }
    });

    resetGame();
});
