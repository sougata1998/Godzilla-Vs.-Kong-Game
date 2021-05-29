score = 0;
cross = true;
audio=new Audio('music.mp3');
jumpaudio = new Audio('jump.mp3');
gameOverAudio = new Audio('gameOver.wav');
gameOverAudio2 = new Audio('gameOver2.mp3');

audio.play();

document.onkeydown = function (e, callback) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.kong');
        dino.classList.add('animateKong');
        jumpaudio.play();
        setTimeout(() => {
           
            dino.classList.remove('animateKong')
        }, 700);
    }

    if (e.keyCode == 39) {
        kong = document.querySelector('.kong');
        kongx = parseInt(window.getComputedStyle(kong, null).getPropertyValue('left'));
        kong.style.left = (kongx + 180) + "px";
    }

    if (e.keyCode == 37) {
        kong = document.querySelector('.kong');
        kongx = parseInt(window.getComputedStyle(kong, null).getPropertyValue('left'));
        kong.style.left = (kongx - 100) + "px";
    }
}
setInterval(() => {
    kong = document.querySelector('.kong');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    kx = parseInt(window.getComputedStyle(kong, null).getPropertyValue('left'));
    ky = parseInt(window.getComputedStyle(kong, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(kx - ox);
    offsetY = Math.abs(ky - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 120 && offsetY < 90) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        gameOverAudio.play();
        audio.pause();
        setTimeout(() => {
            gameOverAudio.pause();
            gameOverAudio2.play();
        }, 2000);

    }

    else if (offsetX < 120 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setInterval(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDuration = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDuration = aniDuration - 0.02;
            obstacle.style.animationDuration = newDuration + 's';
        }, 500);

    }
}, 100);

function updateScore(score) {
    scoreCont.innerHTML = "Your score : " + score;
}