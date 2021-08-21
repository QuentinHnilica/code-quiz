//BasePage Vars
var StartButton = document.getElementById("StartButton");
var h2 = document.getElementById("h2");
var answers = document.getElementById("answers");
var timerText = document.getElementById("timer");
var wrongAnswer = document.getElementById("wrong")
var leaderUl = document.getElementById("leaderstats")

var inputDiv = document.getElementById("inputDiv")
var newButtonTable = []

var counterVar = 0
var rightAnswers = 0
var sec = 60;
var gameStarted = false;

timerText.textContent = sec + " sec"

//These Arrays will store the string values for the button text
var firstAnswers = ["console.log(" + '\u0022' + "HelloWorld" + '\u0022' + ")", "print(" + '\u0022' + "HelloWorld" + '\u0022' + ")", "Debug.Log(" + '\u0022' + "HelloWorld" + '\u0022' + ")", "echo(" + '\u0022' + "HelloWorld" + '\u0022' + ")"]
var secondAnswers = ["myString", "Bool", "String", "Txt"]
var thirdAnswers = ["--", "-/", "/*", "//"]
var forthAnswers = ["public float x = 2.6", "var x = 2.6", "float x = 2.6", "None of the above"]
var fifthAnswers = ["function{}", "functionName", "functionName()", "functionName.Run()"]

//AnswerKey
var firstKey = [true, false, false, false]
var secondKey = [false, false, true, false]
var thirdKey = [false, false, false, true]
var forthKey = [false, true, false, false]
var fifthKey = [false, false, true, false]

//saving initials Vars
var localData = window.localStorage
var scores = []
var scoreEL = []

inputDiv.style.display = "none"
wrongAnswer.style.visibility = "hidden";

function resetPage(){
    
    //resets all starting vars
    var playAgain = document.getElementById("playAgain")
    
    playAgain.parentNode.removeChild(playAgain)
    StartButton.style.visibility = "visible";
    sec = 60;
    timerText.textContent = sec + " sec"
    rightAnswers = 0
    for (var i =0; i < scoreEL.length; i++){
        scoreEL[i].parentNode.removeChild(scoreEL[i])
        
    }
    scoreEL = []
    h2.innerText = "Press button to start the game"
}

function sortLeader(){
    document.getElementById("StartButton").style.visibility = "hidden"
    h2.innerText = "Leaderboard!"
    scores.sort((a, b) => b.score - a.score) //sorts highest score to the top
    scores.forEach((e) => {
       var newScore = document.createElement('li') //creates a new li element for all score objects in my array
       newScore.className = "list-group-item"
       
       newScore.innerText = `${e.player} ${e.score}`
       newScore.style.margin = "4%"
       newScore.style.backgroundColor = "purple"
       newScore.style.color = "white"
       newScore.style.width = "220px"
       scoreEL.push(newScore) //I push it to an array so I can referense and destroy them later
       leaderUl.appendChild(newScore)

       
    });

    for (var i = 0; i < scores.length; i++){
        localData.setItem("leader" +i, scores[i].player + "" + scores[i].score)
    }
    var playAgain = document.createElement('button')
    playAgain.id = "playAgain"
    playAgain.className = "btn btn-primary btn-lg"
    playAgain.innerText = "Go Back";
    answers.appendChild(playAgain)
    playAgain.addEventListener('click', resetPage)
    //displayLeaderBoards()
}

function saveLeader(){
    var textValue = document.querySelector('#initials')
    var realInitials = textValue.value.replace(/[0-9]/g, '');
    var leader = {}
    leader.player = realInitials
    leader.score = sec
    scores.push(leader)
    sortLeader()
    inputDiv.style.display = "none"
    //localData.setItem("leaderstats", leaderStats)
}

function endGame(){
    var rightOrWrong = document.getElementById("rightOrWrong")
    inputDiv.style.display = "block"
    rightOrWrong.style.display = "none"
    wrongAnswer.style.visibility = "hidden";
    gameStarted = false;
    for (var i = 0; i < 4; i++){
        newButtonTable[i].parentNode.removeChild(newButtonTable[i]); //Destroys my buttons
    }
    newButtonTable = []
    counterVar = 0

    var saveData = document.getElementById("save")

    saveData.addEventListener('click', saveLeader);
    
}

function timer(){
    
    var timer = setInterval(function(){
        var rightOrWrong = document.getElementById("rightOrWrong")
        if (gameStarted){
            timerText.innerHTML= sec + " sec";
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                resetPage();
            }
            rightOrWrong.style.display = "none"
            wrongAnswer.style.visibility = "hidden";
        }   
        else{
            rightOrWrong.style.display = "none"
            wrongAnswer.style.visibility = "hidden";
            clearInterval(timer);
            return
        }
    }, 1000);
}

function changeText(){
    for (var i = 0; i < 4; i++){

        switch(counterVar){
            case 1: 
                newButtonTable[i].innerText = firstAnswers[i]
                h2.innerText = "What is a correct syntax to output " + '\u0022' + "HelloWorld" + '\u0022' + " in Java?"
                break
            case 2:
                newButtonTable[i].innerText = secondAnswers[i]
                h2.innerText = "Which data type is used to create a variable that should store text?"
                break
            case 3:
                newButtonTable[i].innerText = thirdAnswers[i]
                h2.innerText = "How do you comment one line of code in JS?"
                break
            case 4:
                newButtonTable[i].innerText = forthAnswers[i]
                h2.innerText = "How do you define a float of 2.6 in JS"
                break
            case 5:
                newButtonTable[i].innerText = fifthAnswers[i]
                h2.innerText = "How do you call a function?"
                break
            case 6: 
                if (i==3){
                    h2.innerText = "Quiz finished, you got " + rightAnswers + "/5 questions correct!"
                    endGame();
                }
                break
        }
    }
}


function answerSelected(event){
    var pressedButton = newButtonTable.indexOf(event.path[0]) // this is index of newButtonTable
    var rightOrWrong = document.getElementById("rightOrWrong")

    switch(counterVar){
        case 1:
            if (firstKey[pressedButton]){
                rightOrWrong.innerText = "Correct!"
                rightOrWrong.style.display = "block"
                rightAnswers++
            }
            else{
                rightOrWrong.innerText = "incorrect!"
                rightOrWrong.style.display = "block"
                wrongAnswer.style.visibility = "visible";
                sec -= 5
            }
            break
        case 2:
            if (secondKey[pressedButton]){
                rightOrWrong.innerText = "Correct!"
                rightOrWrong.style.display = "block"
                rightAnswers++
            }
            else{
                rightOrWrong.innerText = "incorrect!"
                rightOrWrong.style.display = "block"
                wrongAnswer.style.visibility = "visible";
                sec -= 5
            }
            break
        case 3: 
            if (thirdKey[pressedButton]){
                rightOrWrong.innerText = "Correct!"
                rightOrWrong.style.display = "block"
                rightAnswers++
            }
            else{
                rightOrWrong.innerText = "incorrect!"
                rightOrWrong.style.display = "block"
                wrongAnswer.style.visibility = "visible";
                sec -= 5
            }
            break
        case 4:
            if (forthKey[pressedButton]){
                rightOrWrong.innerText = "Correct!"
                rightOrWrong.style.display = "block"
                rightAnswers++
            }
            else{
                rightOrWrong.innerText = "incorrect!"
                rightOrWrong.style.display = "block"
                wrongAnswer.style.visibility = "visible";
                sec -= 5
            }
            break
        case 5:
            if (fifthKey[pressedButton]){
                rightOrWrong.innerText = "Correct!"
                rightOrWrong.style.display = "block"
                rightAnswers++
            }
            else{
                rightOrWrong.innerText = "incorrect!"
                rightOrWrong.style.display = "block"
                wrongAnswer.style.visibility = "visible";
                sec -= 5
            }
            break
        }

        
    counterVar++
    changeText()
}


function MakeButtons(){
    for (var i = 0; i < 4; i++){
        //Creates 4 Buttons and adds them to an array for quick easy reference
        var newButton = document.createElement('button');
        newButton.innerText = "Bruh";
        newButton.id="AnswerButton"
        newButton.className = "btn btn-primary btn-lg"
        newButton.style.margin = "4%"
        answers.appendChild(newButton);
        newButton.addEventListener('click', answerSelected)
        newButtonTable[i] = newButton //Use this to reference each button
    }  
    var newTextBox = document.createElement('h3')
    newTextBox.id = "rightOrWrong"
    newTextBox.style.margin = "4%"
    newTextBox.style.display = "none"
    answers.appendChild(newTextBox)
}

function startGame(){
    gameStarted = true //bool is for the timer 
    timer()
    StartButton.style.visibility= "hidden"; // hides the start button so it cannot be clicked again
    MakeButtons();
    counterVar++ //tells which question to ask.
    changeText()
}

function checkStorage(){
    for (var i = 0; i < localData.length; i++){   
        if (localData.getItem("leader" + i)  != null){ //checks if there is a leaderboard key in localstorage
            var oldObjects = {}
            var oldInitials = localData.getItem("leader" + i).replace(/[0-9]/g, ''); //removes numbers from the string
            var oldScore = parseInt(localData.getItem("leader" + i).match(/\d+/g)); //removes chars from the string
            oldObjects.score = oldScore
            scores.push(oldObjects)
        }
    }
}

checkStorage()


StartButton.addEventListener('click', startGame); //StartsGame