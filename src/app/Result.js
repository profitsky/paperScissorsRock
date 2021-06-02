import { AudioController } from "./AudioController";
export class Result{ 
    

    constructor({userScoreWrapper, coputerScoreWrapper, resultWrapper, summaryMessageWrapper, summaryResultWrapper})
    {
        this.userScoreWrapper = userScoreWrapper;
        this.coputerScoreWrapper = coputerScoreWrapper;
        this.resultWrapper = resultWrapper;
        this.audioController = new AudioController();
        this.start();
        this.finalMessage = ["You won!!", "You Lost", "Draw"];
        this.summaryMessageWrapper = summaryMessageWrapper;
        this.summaryResultWrapper = summaryResultWrapper;
    };

    getResult(userChoice, computerChoice)
    {
        switch(userChoice+computerChoice)
        {
            case "paperrock":
            case "rockscissors":
            case "scissorspaper":                
                this.win(userChoice, computerChoice);
                break;

            case "rockpaper":
            case "scissorsrock":
            case "paperscissors":                
                this.lose(userChoice, computerChoice);
                break;

            case "rockrock":
            case "scissorsscissors":
            case "paperpaper":
                this.draw(userChoice, computerChoice);
                break;               
        }
    };

    win(user, computer)
    {   
        this.userScore++;
        this.userScoreWrapper.innerHTML = this.userScore;
        this.userScoreWrapper.classList.add("heading-primary--zoom");
        this.resultWrapper.innerHTML = `${user} beats ` + `${computer} .` + "You Win!";
        this.audioController.playWinRound();
    };


    lose(user, computer)
    {   
        this.compScore++;
        this.coputerScoreWrapper.innerHTML = this.compScore;
        this.coputerScoreWrapper.classList.add("heading-primary--zoom");     
        this.resultWrapper.innerHTML = `${computer} beats ` + `${user} .` + "You Lose!";
        this.audioController.playLoseRound(); 
    };

    draw(user, computer)
    {
        this.userScore++;
        this.compScore++;
        this.coputerScoreWrapper.innerHTML = this.compScore;
        this.userScoreWrapper.innerHTML = this.userScore;
        this.coputerScoreWrapper.classList.add("heading-primary--zoom"); 
        this.userScoreWrapper.classList.add("heading-primary--zoom"); 
        this.resultWrapper.innerHTML = "Draw"
        this.audioController.playDrawRound(); 
    };

    showResult(){
        this.summaryResultWrapper[0].innerHTML = this.userScore;
        this.summaryResultWrapper[2].innerHTML = this.compScore;
        console.log(this.summaryResultWrapper)
    };

    getSummary(){

        if (this.userScore > this.compScore){
            this.wonGame();
        }
        else if (this.userScore < this.compScore){
            this.lostGame();
        }
        else if (this.userScore === this.compScore){
            this.drawGame();
        };
    };

    wonGame(){
        this.audioController.playWinGame();
        this.summaryMessageWrapper.innerHTML = this.finalMessage[0];
    };

    lostGame(){
        this.audioController.playLoseGame();
        this.summaryMessageWrapper.innerHTML = this.finalMessage[1];
    };

    drawGame(){
        this.audioController.playDrawRound();
        this.summaryMessageWrapper.innerHTML = this.finalMessage[2];
    };

    start(){
        this.userScore = 0;
        this.compScore = 0;
        this.userScoreWrapper.innerHTML = this.userScore;
        this.coputerScoreWrapper.innerHTML = this.compScore;
    };
};