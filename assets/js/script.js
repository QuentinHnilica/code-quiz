//BasePage Vars
var StartButton = document.getElementById("StartButton");
var h2 = document.getElementById("h2");
var answers = document.getElementById("answers");
var newButtonTable = []

//These Arrays will store the string values for the button text
var firstAnswers = []
var secondAnswers = []
var thirdAnswers = []
var forthAnswers = []
var fifthAnswers = []

//TimerVars

//resetVars

//saving initials Vars


function MakeButtons(){
    for (var i = 0; i < 4; i++){
        //Creates 4 Buttons and adds them to an array for quick easy reference
        var newButton = document.createElement('button');
        newButton.style.width = "50px";
        newButton.style.height = "20px";
        newButton.innerText = "Bruh";
        newButton.id="AnswerButton"
        answers.appendChild(newButton);
        newButton[i] = newButton //Use this to reference each button
    }  
}

function startGame(){
    StartButton.style.visibility= "hidden"; 
    MakeButtons()

    //Set up first question and Button answers


    //Add timer logic here


}


StartButton.addEventListener('click', startGame); //StartsGame