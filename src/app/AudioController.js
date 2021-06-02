
export class AudioController{

    constructor(){
        this.flipSound = new Audio("./audio/error.mp3");
        this.button = new Audio("./audio/button.mp3");
        this.fadeOut = new Audio("./audio/fadeOut.mp3");
        this.select = new Audio("./audio/selected.mp3");
        this.bgMusic = new Audio("./audio/bcgMelody.mp3");
        this.winRound = new Audio("./audio/winRound.mp3");
        this.loseRound = new Audio("./audio/loseRound.mp3");
        this.drawRound = new Audio("./audio/drawRound.mp3");
        this.winGame = new Audio("./audio/winGame.mp3");
        this.loseGame = new Audio("./audio/loseGame.mp3");
        this.bgMusic.volume = 0.3;
        this.bgMusic.loop = true;
    };

    playWinGame(){
        this.winGame.play();
    };

    playLoseGame(){
        this.loseGame.play();
    };

    playError(){
        this.flipSound.play();
    };

    stopError(){
        this.flipSound.pause();
        this.flipSound.currentTime = 0;
    };

    playButton(){
        this.button.play();
    };

    stopButton(){
        this.button.pause();
        this.button.currentTime = 0;
    };

    playFadeOut(){
        this.fadeOut.play();
    };

    playSelected(){
        this.select.play();
    };

    playWinRound(){
        this.winRound.play();
    };

    playLoseRound(){
        this.loseRound.play();
    };

    playDrawRound(){
        this.drawRound.play();
    };

    startMusic(){
        this.bgMusic.ontimeupdate = function(){
            if((this.currentTime / this.duration)>0.9223){
                this.currentTime = 0;
                this.play();
            }
        };
        this.bgMusic.play();
    };

    stopMusic(){
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    };
};