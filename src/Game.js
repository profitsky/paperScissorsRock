import "../src/sass/main.scss";
import {Result} from "../src/app/Result";

class Game{

    currentStep = 0;
    lastStep = 10;    
    

    constructor({scoreBoardSelector, choiceWrapper, messageWrapper})
    {
        this.scoreBoardSelector = scoreBoardSelector;        
        this.choiceWrapper = choiceWrapper;
        this.messageWrapper = messageWrapper;

        this.resultGenerator = new Result({
            userScoreWrapper: document.getElementById("user-score"),
            coputerScoreWrapper: document.getElementById("comp-score"),
            resultWrapper: document.querySelector(".result")            
            });            
    };

    getComputerChoice()
    {
        const randomChoice = this.choiceWrapper[(Math.floor(Math.random()*3))].id
        return randomChoice;
    };

    getUserChoice(e)
    {   
        
        // this.currentStep++;
        let userChoice = e.target.id;
        console.log(e.target) ;      
        this.resultGenerator.getResult(e.target.id, this.getComputerChoice()); 
        this.messageWrapper.innerHTML = "You chose " + `${userChoice}`              
    };

    start()
    {           
        
        for(let i =0; i<this.choiceWrapper.length; i++){
        this.choiceWrapper[i].addEventListener("click", (e) => this.getUserChoice(e))}                 
    };
};

const game = new Game({    
    scoreBoardSelector: document.querySelector(".score-board"),   
    choiceWrapper: [...document.querySelectorAll(".choice")],
    messageWrapper: document.getElementById("player-message")
});

game.start();