export class Effects{

    constructor(boxWrapper, pathProperty){
        this.boxWrapper = boxWrapper;
        this.pathProperty = pathProperty;
        this.idInterval;
        this.index = 0;
    };

    createBox(value){
        const backgroundAnimatedElement = document.createElement("div");
        backgroundAnimatedElement.classList.add("background-animation-container__element")
        let size = Math.random()*100;
        backgroundAnimatedElement.style.width = 20 + size + "px";
        backgroundAnimatedElement.style.height = 20 + size + "px";
        backgroundAnimatedElement.style.top = Math.random() * innerHeight + "px";
        backgroundAnimatedElement.style.left = Math.random() * innerWidth + "px";      
        backgroundAnimatedElement.style.backgroundSize = 20 + size + "px";
        backgroundAnimatedElement.style.backgroundImage = Object.values(this.pathProperty)[value];
        console.log(backgroundAnimatedElement)    
        this.boxWrapper.appendChild(pathProperty.length);

        setTimeout(() => {
            backgroundAnimatedElement.remove();
        }, 5000);
    };

    generateElement(){
        this.idInterval = setInterval(() => {
            this.createBox(this.index);
            this.index++;
            if(this.index == 3){
                this.index = 0;
            };
            
        }, 100);
    };
};
