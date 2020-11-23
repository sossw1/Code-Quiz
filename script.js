// Initialize variables
var q1 = {
    q: "Who created JavaScript?",
    a: "Sun Microsystems",
    b: "Netscape",
    c: "Oracle",
    d: "Microsoft"
}

var q2 = {
    q: "What are other names that JavaScript used to go by?",
    a: "Mocha",
    b: "Latte",
    c: "Java",
    d: "Caffe"
}

var q3 = {
    q: "Which of the following is not a reserved word in JavaScript?",
    a: "finally",
    b: "throw",
    c: "default",
    d: "undefined"
}
var questions = [q1, q2, q3];
var answerKey = ["b","a","d"];
var qNum = 0;
var timeRemaining = 30;
var timerEl = `<p id='timer'>Time: ${timeRemaining}</p>`;
var name = "";
var score = 0;
var arrLocalNames = [];
var arrLocalScores = [];
var updateBool = false;


var startTimer = function () {
    $("nav").append(timerEl);
    var timerInterval = setInterval(function(){
        timeRemaining--;
        $("#timer").html(`Time: ${timeRemaining}`);
        if(timeRemaining === 0) {
            clearInterval(timerInterval);
            if(qNum<questions.length){
                highScores();
            }
        }
    },1000);
}

var nextQuestion = function () {
    if(qNum<questions.length){
        $("body").append(`<section id='q${qNum}' class='question'>`);
        var questionEl = $(`#q${qNum}`);
        questionEl.append(`<h2>Question ${qNum+1}: ${questions[qNum].q}`);
        for(let i=0; i<4; i++){
            let options = ["a","b","c","d"];
            var btn = $("<button>")
            btn.attr("class","answer-btn");
            btn.attr("id",`${options[i]}`);
            btn.text(`${options[i]}: ${questions[qNum][options[i]]}`);
            questionEl.append(btn);
            questionEl.append("<br>");
            btn.on("click", function(event){
                var answerChoice = event.target.id;
                console.log(answerChoice);
                if(answerKey[qNum] === answerChoice){
                    questionEl.append("<p>Correct!");
                }
                else {
                    questionEl.append("<p>Incorrect!");
                    timeRemaining -= 10;
                }
                setTimeout(function(){
                    questionEl[0].style.display = "none";
                    qNum++;
                    nextQuestion();
                },1000);
            });
        }
    }
    else{
        highScores();
    }
}

var highScores = function () {
    // Use this score for highscores
    score = timeRemaining;
    if(score<0){score=0;}
    var sect = $("section");
    for(let i=0; i<sect.length; i++){
        sect[i].style.display = "none";
    }
    var timerEl = $("#timer");
    timerEl[0].style.display = "none";
    $("body").append("<section id='high-scores'>");
    $("#high-scores").append("<h2>High Scores");
    $("#high-scores").append("<form>")
    $("form").append("<label for='name'>Enter your name");
    $("form").append("<br>")
    $("form").append("<input type='text' id='name' name ='name' maxlength='3'>");
    //Listen for submit
    $("form").submit(function(event){
        event.preventDefault();
        name = $("#name")[0].value;
        updateBool = true;
        $("form")[0].style.display = "none";
        updateHighScores();
        displayHighScores();
    });
}

var updateHighScores = function() {
    //Update high scores only for new records

    //Get names and scores strings from localStorage
    var strLocalNames = localStorage.getItem("names");
    var strLocalScores = localStorage.getItem("scores");
    //Add current name and score and set localStorage items
    if(strLocalNames === null) {
        arrLocalNames.push(name);
        var str = JSON.stringify(arrLocalNames);
        localStorage.setItem("names",str);
    }
    else {
        arrLocalNames = JSON.parse(strLocalNames);
        arrLocalNames.push(name);
        var str = JSON.stringify(arrLocalNames);
        localStorage.setItem("names",str);
    }

    if(strLocalScores === null) {
        arrLocalScores.push(score);
        var str = JSON.stringify(arrLocalScores);
        localStorage.setItem("scores",str);
    }
    else {
        arrLocalScores = JSON.parse(strLocalScores);
        arrLocalScores.push(score);
        var str = JSON.stringify(arrLocalScores);
        localStorage.setItem("scores",str);
    }
}

var displayHighScores = function() {
    var sect = $("section");
    for(let i=0; i<sect.length; i++){
        sect[i].style.display = "none";
    }
    $("body").append("<section>");
    $("section").append("<h2>High Scores");
    
    for(let i=0; i<arrLocalScores.length; i++){
        $("section").append("<hr>");
        $("section").append(`<p>${arrLocalNames[i]} - ${arrLocalScores[i]}`);
    }
}

$("body").append("<nav>");
$("nav").append("<button id='view-highscores'>View High Scores");
$("body").append(`<section id="intro-section">`);
var introSectionEl = $("#intro-section");
introSectionEl.append("<h1>Code Quiz Challenge");
introSectionEl.append("<p>Try your best to finish the following code-related questions within the time limit.");
introSectionEl.append("<p>Keep in mind that incorrect answers will penalize your score/time by 10 seconds!")
introSectionEl.append("<button id='start-btn'>Start Quiz!");

$("#start-btn").on("click",function(){
    introSectionEl[0].style.display = "none";
    startTimer();
    nextQuestion();
});

$("#view-highscores").on("click", function(){
    updateHighScores();
    displayHighScores();
});