//Initialize variables
var q1 = {
    q: "question",
    a: "incorrect",
    b: "correct",
    c: "incorrect",
    d: "incorrect"
}

var q2 = {
    q: "question",
    a: "correct",
    b: "incorrect",
    c: "incorrect",
    d: "incorrect"
}

var q3 = {
    q: "question",
    a: "incorrect",
    b: "incorrect",
    c: "incorrect",
    d: "correct"
}
var questions = [q1, q2, q3];
var qNum = 0;
var timeRemaining = 30;
var timerEl = `<p id='timer'>Time: ${timeRemaining}</p>`;


var startTimer = function () {
    $("nav").append(timerEl);
    var timerInterval = setInterval(function(){
        timeRemaining--;
        $("#timer").html(`Time: ${timeRemaining}`);
        if(timeRemaining === 0) {
            clearInterval(timerInterval);
            if(qNum<3){
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
                if(questions[qNum][answerChoice] === "correct"){
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
    //Use this score for highscores
    var score = timeRemaining;
    if(score<0){score=0;}
    
    var sect = $("section");
    for(let i=0; i<sect.length; i++){
        sect[i].style.display = "none";
    }
    var timerEl = $("#timer");
    timerEl[0].style.display = "none";
    $("body").append("<section>");
    $("section").append("<h2>High Scores");
    $("section").append("<p>Test");
}

$("body").append("<nav>");
$("nav").append("<a href=''>View High Scores");
$("body").append(`<section id="intro-section">`);
var introSectionEl = $("#intro-section");
introSectionEl.append("<h1>Code Quiz Challenge");
introSectionEl.append("<p>Try your best to finish the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!");
introSectionEl.append("<button id='start-btn'>Start Quiz!");

$("#start-btn").on("click",function(){
    introSectionEl[0].style.display = "none";
    startTimer();
    nextQuestion();
});

