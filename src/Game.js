import "../src/sass/main.scss";
import {Result} from "../src/app/Result";

class Game{

    currentStep = 0;
    lastStep = 10;
    roundsNumber = 10;   
    

    constructor({roundsDisplay, setupButton, overlay, startButton, scoreBoardSelector, choiceWrapper, messageWrapper})
    {
        this.roundsDisplay = roundsDisplay;
        this.setupButton = setupButton;
        this.overlay = overlay;
        this.startButton = startButton;
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

    pressSetupButton(button){
        
            if(button.classList.contains("btn--up") && this.roundsNumber < 25)
            {
                this.roundsNumber++;
                this.roundsDisplay.innerHTML = this.roundsNumber;
            }
            else if(button.classList.contains("btn--down") && this.roundsNumber > 1)
            {
                this.roundsNumber--;
                this.roundsDisplay.innerHTML = this.roundsNumber;
            }
            else
            {
                console.log("dzwiek i czerwone litery")
            }
    };

    start()
    {       
        this.roundsDisplay.innerHTML = this.roundsNumber;  
        this.startButton.addEventListener("click", ()=>{
            this.overlay.classList.add("overlay--fade-in")
        });

        this.setupButton.forEach(button => {
            button.addEventListener("click", (e) => {
                this.pressSetupButton(button)
                button.classList.add("btn--press")
            });
        });

        

        for(let i =0; i<this.choiceWrapper.length; i++){
        this.choiceWrapper[i].addEventListener("click", (e) => this.getUserChoice(e))}                 
    };
};

const game = new Game({
    roundsDisplay: document.querySelector(".heading-secondary--display"),
    setupButton: document.querySelectorAll(".btn--setup"),
    overlay: document.querySelector(".overlay"),
    startButton: document.querySelector(".btn--start"),
    scoreBoardSelector: document.querySelector(".score-board"),   
    choiceWrapper: [...document.querySelectorAll(".choice")],
    messageWrapper: document.getElementById("player-message")
});

game.start();