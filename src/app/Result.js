export class Result{ 

    userScore = 0;
    compScore = 0;

    constructor({userScoreWrapper, coputerScoreWrapper, resultWrapper})
    {
        this.userScoreWrapper = userScoreWrapper;
        this.coputerScoreWrapper = coputerScoreWrapper;
        this.resultWrapper = resultWrapper;
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
        this.resultWrapper.innerHTML = `${user} beats ` + `${computer} .` + "You Win!";
    };

     lose(user, computer)
    {   
        this.compScore++;
        this.coputerScoreWrapper.innerHTML = this.compScore;        
        this.resultWrapper.innerHTML = `${computer} beats ` + `${user} .` + "You Lose!";    
    };

    draw(user, computer)
    {
        this.userScore++;
        this.compScore++;
        this.coputerScoreWrapper.innerHTML = this.compScore;
        this.userScoreWrapper.innerHTML = this.userScore;
        this.resultWrapper.innerHTML = "Draw"
    };  
};