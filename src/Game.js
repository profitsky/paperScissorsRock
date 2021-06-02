import "../src/sass/main.scss";
import {Result} from "../src/app/Result";
import { AudioController } from "../src/app/AudioController";
import { Effects } from "./app/Effects"
class Game{

    minRounds = 1;
    maxRounds = 25;

     mainButtonsProperty = {
        paper: 'url("./images/paper.png")',
        scissors: 'url("./images/scissors.png")',
        rock: 'url("./images/rock.png")'
    };

    constructor({roundsDisplay, setupButton, overlay, startButton, restartButton, roundsMeter, choiceButtonWrapper, messageOutputWrapper, scoreOutputWrapper, overlayHeaderWrapper, overlaySummaryWrapper, summaryMessageWrapper, summaryResultWrapper, backgroundAnimationWrapper})
    {
        this.roundsDisplay = roundsDisplay;
        this.setupButton = setupButton;
        this.overlay = overlay;
        this.startButton = startButton;
        this.restartButton = restartButton;
        this.roundsMeter = roundsMeter;
        this.choiceButtonWrapper = choiceButtonWrapper;
        this.messageOutputWrapper = messageOutputWrapper;
        this.scoreOutputWrapper = scoreOutputWrapper;
        this.idInterval;
        this.audioController = new AudioController();
        this.computerChoice = [];
        this.userSymbol;
        this.computerSymbol;        
        this.overlayHeaderWrapper = overlayHeaderWrapper;
        this.overlaySummaryWrapper = overlaySummaryWrapper;
        this.summaryMessageWrapper = summaryMessageWrapper;
        this.summaryResultWrapper = summaryResultWrapper;
        this.backgroundAnimationWrapper = backgroundAnimationWrapper;

        this.resultGenerator = new Result({
            userScoreWrapper: this.scoreOutputWrapper[0],
            coputerScoreWrapper: this.scoreOutputWrapper[2],
            resultWrapper: this.messageOutputWrapper[2],
            summaryMessageWrapper: this.summaryMessageWrapper,
            summaryResultWrapper: this.summaryResultWrapper   
            });
        
        
    };

    runLottery()
    {
        clearInterval(this.idInterval);        
        this.scoreOutputWrapper.forEach(element => element.classList.remove("heading-primary--zoom"));
        this.startCounting();        
        let randomNumber = null;
        this.idInterval = setInterval(() => {
            do {randomNumber = Math.floor(Math.random()*3);
            } while (this.computerChoice.includes(randomNumber))                
                this.audioController.stopButton();
                this.audioController.playButton();
  
                this.computerChoice = [];
                this.computerChoice.push(randomNumber);
                this.choiceButtonWrapper.forEach(element => element.style.backgroundColor = "#272727")
                this.choiceButtonWrapper[this.computerChoice[0]].style.backgroundColor = "yellow";
        }, 400);
    };

    startCounting(){
        
        setTimeout(() => {
            clearInterval(this.idInterval);       
            this.getComputerChoice(this.computerChoice[0]);            
        }, 3000);
    };

    getComputerChoice(value){
        this.audioController.playSelected();
        this.computerSymbol = this.choiceButtonWrapper[value].getAttribute("symbol");        
        setTimeout(() => {
            this.messageOutputWrapper[2].innerHTML = "Computer chose " + `${this.computerSymbol}`
            this.showResult();      
        }, 500);
    };

    showResult(){        
           
            setTimeout(() => {
            this.resultGenerator.getResult(this.userSymbol, this.computerSymbol);
            if (this.currentRound < this.roundsNumber){
                this.currentRound++
                this.restoreButtons();
                this.choiceButtonWrapper.forEach(element => element.classList.remove("btn-choice--noHover"));
            }
            else {
                this.restoreButtons();                
                this.audioController.stopMusic();
                setTimeout(() => {
                    this.getSummaryScreen();
                    this.resultGenerator.getSummary();
                }, 1500);
                
            };
        }, 1500);
    };

    getSummaryScreen(){
        this.overlay.classList.add("overlay--fade-out");
        this.overlay.classList.remove("overlay--fade-in");
        this.overlayHeaderWrapper.classList.add("overlay__header--isHidden");
        this.overlaySummaryWrapper.classList.remove("overlay__summary--isHidden");
        this.resultGenerator.showResult();
        this.backGroundEfect = new Effects(this.backgroundAnimationWrapper, this.mainButtonsProperty);
        this.backGroundEfect.generateElement();
        
        
        this.restartButton.addEventListener("click", () => {  
            clearInterval(this.backGroundEfect.idInterval)    
            this.roundsNumber = 10;
            this.currentRound = 1;
            this.roundsDisplay.innerHTML = this.roundsNumber;
            this.resultGenerator.start();
            this.overlayHeaderWrapper.classList.remove("overlay__header--isHidden");
            this.overlaySummaryWrapper.classList.add("overlay__summary--isHidden");
            this.overlay.classList.remove("overlay--fade-out");
        })
    };

    restoreButtons(){        
        setTimeout(() => {
            this.roundsMeter[1].innerHTML = this.currentRound;
            this.choiceButtonWrapper.forEach(element => element.classList.remove("btn-choice--isActive"));
            this.choiceButtonWrapper.forEach(element => element.style.backgroundColor = "");
        }, 200);
    };

    getUserChoice(e)
    {    
        this.audioController.playSelected();
        e.target.classList.add("btn-choice--isActive");
        this.choiceButtonWrapper.forEach(element => element.classList.add("btn-choice--noHover"));
        this.userSymbol = e.target.getAttribute("symbol");
        
        setTimeout(() => {
            this.messageOutputWrapper[2].innerHTML = "You chose " + `${this.userSymbol}`
            this.runLottery();
        }, 500); 
    };

    pressSetupButton(button){

            if(button.classList.contains("btn--up") && this.roundsNumber < this.maxRounds)
            {
                this.audioController.stopButton();
                this.roundsDisplay.classList.remove("heading-secondary--limit");
                this.audioController.playButton();
                this.roundsNumber++;
                this.roundsDisplay.innerHTML = this.roundsNumber;
            }
            else if(button.classList.contains("btn--down") && this.roundsNumber > this.minRounds)
            {
                this.audioController.stopButton();
                this.roundsDisplay.classList.remove("heading-secondary--limit");
                this.audioController.playButton();
                this.roundsNumber--;
                this.roundsDisplay.innerHTML = this.roundsNumber;                
            }
            else
            {    
                this.roundsDisplay.classList.remove("heading-secondary--limit");            
                this.audioController.stopError();
                this.audioController.playError();
                void this.roundsDisplay.offsetWidth;
                this.roundsDisplay.classList.add("heading-secondary--limit"); 
            };
    };

    overlayLoad(){   
        this.roundsDisplay.innerHTML = this.roundsNumber;
        this.startButton.addEventListener("click", ()=>{            
            this.overlay.classList.add("overlay--fade-in");
            this.audioController.playFadeOut();
            this.roundsMeter[3].innerHTML = this.roundsNumber;
            this.roundsMeter[1].innerHTML = this.currentRound;
                    
            setTimeout(() => {
                this.audioController.startMusic();
                this.choiceButtonWrapper.forEach(element => element.classList.remove("btn-choice--noHover"));
                this.choiceButtonWrapper.forEach(element => element.classList.remove("btn-choice--isHidden"));
            },1500)
        });
    };

    renderSetupButtons(){
        this.setupButton.forEach(button => {
            button.addEventListener("click", (e) => {           
            this.pressSetupButton(button);
            });
        });
    }

    renderChoiceButtons(){
        for (let [index,[key, value]] of Object.entries(Object.entries(this.mainButtonsProperty))) {
            this.choiceButtonWrapper[index].setAttribute("symbol", key);
            this.choiceButtonWrapper[index].style.backgroundImage = value;
            this.choiceButtonWrapper[index].addEventListener("click", e => this.getUserChoice(e))
        };
    };

    start()
    {          
        this.roundsNumber = 10;
        this.currentRound = 1;
        this.computerChoice = [];      
        this.userSymbol = null;
        this.computerSymbol = null;
        this.overlayLoad();
        this.renderSetupButtons();
        this.renderChoiceButtons();
    };
};

const game = new Game({
    roundsDisplay: document.querySelector(".heading-secondary--display"),
    setupButton: document.querySelectorAll(".btn--setup"),
    overlay: document.querySelector(".overlay"),
    startButton: document.querySelector(".btn--start"),
    roundsMeter: document.querySelectorAll(".heading-secondary--display-yellow"),
    choiceButtonWrapper: document.querySelectorAll(".btn-choice"),
    messageOutputWrapper: document.querySelectorAll(".heading-secondary--display-grey"),
    scoreOutputWrapper: document.querySelectorAll(".heading-primary--display-grey"),
    overlayHeaderWrapper: document.querySelector(".overlay__header"),
    overlaySummaryWrapper: document.querySelector(".overlay__summary"),
    restartButton: document.querySelector(".btn--restart"),
    summaryMessageWrapper: document.querySelector(".overlay__summary-message"),
    summaryResultWrapper: document.querySelectorAll(".heading-secondary--display-summary"),
    backgroundAnimationWrapper: document.querySelector(".background-animation-container")
});

game.start();