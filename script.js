//Initialize variables
var timeRemaining = undefined;
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

var startTimer = function () {
    timeRemaining = 100;
    var timerEl = `<p id='timer'>Time: ${timeRemaining}</p>`;
    $("nav").append(timerEl);
    setInterval(function(){
        if(timeRemaining !== 0){
            timeRemaining--;
            $("#timer").html(`Time: ${timeRemaining}`);
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
        //end quiz and display high scores
    }
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

