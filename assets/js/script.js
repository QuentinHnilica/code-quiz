//BasePage Vars
var StartButton = document.getElementById("StartButton");
var h2 = document.getElementById("h2");
var answers = document.getElementById("answers");
var timerText = document.getElementById("timer");
var newButtonTable = []

var counterVar = 0
var rightAnswers = 0
var sec = 75;
var gameStarted = false;

timerText.textContent = sec + " sec"
//These Arrays will store the string values for the button text
var firstAnswers = ["true", "false", "false", "false"]
var secondAnswers = ["false", "false", "true", "false"]
var thirdAnswers = ["false", "false", "false", "true"]
var forthAnswers = ["false", "true", "false", "false"]
var fifthAnswers = ["false", "false", "true", "false"]

//AnswerKey
var firstKey = [true, false, false, false]
var secondKey = [false, false, true, false]
var thirdKey = [false, false, false, true]
var forthKey = [false, true, false, false]
var fifthKey = [false, false, true, false]

//resetVars

//saving initials Vars


function resetPage(){
    gameStarted = false;
    newButtonTable = []
    counterVar = 0
    var element = document.getElementById('AnswerButton');
    element.parentNode.removeChild(element);
    StartButton.style.visibility = "visible";
    sec = 75;
}

function timer(){
    var timer = setInterval(function(){
        if (gameStarted){
            timerText.innerHTML= sec + " sec";
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                resetPage();
            }
        }   
    }, 1000);
}

function changeText(){
    for (var i = 0; i < 4; i++){
        if (counterVar == 1){
            newButtonTable[i].innerText = firstAnswers[i]
        }
        else if (counterVar == 2){
            newButtonTable[i].innerText = secondAnswers[i]
        }
        else if (counterVar == 3){
            newButtonTable[i].innerText = thirdAnswers[i]
        }
        else if (counterVar == 4){
            newButtonTable[i].innerText = forthAnswers[i]
        }
        else if (counterVar == 5){
            newButtonTable[i].innerText = fifthAnswers[i]
        }
        else{
            console.log("Quiz finished, you got " + rightAnswers + "/5 questions correct!")
            resetPage()
            //Create resetbutton and save time button
        }
    }
}


function answerSelected(event){
    var pressedButton = newButtonTable.indexOf(event.path[0]) // this is index of newButtonTable
    if (counterVar == 1){
        if (firstKey[pressedButton]){
            console.log("you're right!")
            rightAnswers++
        }
        else{
            console.log("you're Wrong")
            sec -= 5
        }
    }
    else if (counterVar == 2){
        if (secondKey[pressedButton]){
            console.log("you're right!")
            rightAnswers++
        }
        else{
            console.log("you're Wrong")
            sec -= 5
        }
    }
    else if (counterVar == 3){
        if (thirdKey[pressedButton]){
            console.log("you're right!")
            rightAnswers++
        }
        else{
            console.log("you're Wrong")
            sec -= 5
        }
    }
    else if (counterVar == 4){
        if (forthKey[pressedButton]){
            console.log("you're right!")
            rightAnswers++
        }
        else{
            console.log("you're Wrong")
            sec -= 5
        }
    }
    else if (counterVar == 5){
        if (fifthKey[pressedButton]){
            console.log("you're right!")
            rightAnswers++
        }
        else{
            console.log("you're Wrong")
            sec -= 5
        }
    }

    counterVar++
    changeText()
}


function MakeButtons(){
    for (var i = 0; i < 4; i++){
        //Creates 4 Buttons and adds them to an array for quick easy reference
        var newButton = document.createElement('button');
        newButton.style.width = "50px";
        newButton.style.height = "20px";
        newButton.innerText = "Bruh";
        newButton.id="AnswerButton"
        answers.appendChild(newButton);
        newButton.addEventListener('click', answerSelected)
        newButtonTable[i] = newButton //Use this to reference each button
    }  
}

function startGame(){
    gameStarted = true
    timer()
    StartButton.style.visibility= "hidden"; 
    MakeButtons();
    counterVar++
    changeText()
    
    //Set up first question and Button answers
    //firstQuestions();

    //Add timer logic here


}


StartButton.addEventListener('click', startGame); //StartsGame