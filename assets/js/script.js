var StartButton = document.getElementById("StartButton")
var h2 = document.getElementById("h2")
var ul = document.getElementById("ul")




function startGame(){
    StartButton.style.visibility= "hidden"; 
    var option1 = document.createElement('button')
    ul.appendChild(option1)
}


StartButton.addEventListener('click', startGame)