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
var localData = window.localStorage
var scores = []
var scoreEL = []

inputDiv.style.display = "none"
wrongAnswer.style.visibility = "hidden";

function resetPage(){
    
    
    var playAgain = document.getElementById("playAgain")
    
    
    playAgain.parentNode.removeChild(playAgain)
    StartButton.style.visibility = "visible";
    sec = 75;
    for (var i =0; i < scoreEL.length; i++){
        scoreEL[i].parentNode.removeChild(scoreEL[i])
        
    }
    scoreEL = []
    h2.innerText = "Press button to start the game"
}

function sortLeader(){
    document.getElementById("StartButton").style.visibility = "hidden"
    h2.innerText = "Leader Board!"
    scores.sort((a, b) => b.score - a.score)
    scores.forEach((e) => {
       var newScore = document.createElement('li')
       newScore.className = "list-group-item"
       
       newScore.innerText = `${e.player} ${e.score}`
       scoreEL.push(newScore)
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
    var realInitials = document.querySelector('#initials')
    var leader = {}
    leader.player = realInitials.value
    leader.score = sec
    scores.push(leader)
    sortLeader()
    inputDiv.style.display = "none"
    //localData.setItem("leaderstats", leaderStats)
}

function endGame(){
    inputDiv.style.display = "block"
    gameStarted = false;
    for (var i = 0; i < 4; i++){
        newButtonTable[i].parentNode.removeChild(newButtonTable[i]);
    }
    newButtonTable = []
    counterVar = 0
    // var initials = document.createElement('input')
    // initials.id="initials"
    // initials.type = "text"
    // initials.className = "form-control"
    // answers.appendChild(initials);
    // var saveData = document.createElement('button')
    // saveData.id = "save"
    // saveData.className = "btn btn-primary btn-lg"
    // answers.appendChild(saveData)

    
    // saveData.innerText = "SaveScore";
    
    var saveData = document.getElementById("save")

    saveData.addEventListener('click', saveLeader);
    
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
            wrongAnswer.style.visibility = "hidden";
        }   
        else{
            clearInterval(timer);
            return
        }
    }, 1000);
}

function changeText(){
    for (var i = 0; i < 4; i++){
        if (counterVar == 1){
            newButtonTable[i].innerText = firstAnswers[i]
            h2.innerText = "Question 1"
        }
        else if (counterVar == 2){
            newButtonTable[i].innerText = secondAnswers[i]
            h2.innerText = "Question 2"
        }
        else if (counterVar == 3){
            newButtonTable[i].innerText = thirdAnswers[i]
            h2.innerText = "Question 3"
        }
        else if (counterVar == 4){
            newButtonTable[i].innerText = forthAnswers[i]
            h2.innerText = "Question 4"
        }
        else if (counterVar == 5){
            newButtonTable[i].innerText = fifthAnswers[i]
            h2.innerText = "Question 5"
        }
        else{
            if (i==3){
                h2.innerText = "Quiz finished, you got " + rightAnswers + "/5 questions correct!"
                endGame();
            }
            
            
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
            wrongAnswer.style.visibility = "visible";
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
            wrongAnswer.style.visibility = "visible";
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
            wrongAnswer.style.visibility = "visible";
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
            wrongAnswer.style.visibility = "visible";
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
            wrongAnswer.style.visibility = "visible";
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
        newButton.innerText = "Bruh";
        newButton.id="AnswerButton"
        newButton.className = "btn btn-primary btn-lg"
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

function checkStorage(){
    for (var i = 0; i < localData.length; i++){
        
        if (localData.getItem("leader" + i)  != null){
            var oldObjects = {}
            var oldInitials = localData.getItem("leader" + i).replace(/[0-9]/g, '');
            var oldScore = parseInt(localData.getItem("leader" + i).match(/\d+/g));
            oldObjects.player = oldInitials
            oldObjects.score = oldScore

            scores.push(oldObjects)
        }
    }
}

checkStorage()


StartButton.addEventListener('click', startGame); //StartsGame