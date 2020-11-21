//Initialize variables
var timeRemaining = 0;
var q1 = {
    q: "question",
    a: "incorrect",
    b: "correct",
    c: "incorrect",
    d: "incorrect"
}

var q2 = {
    q: "",
    a: "",
    b: "",
    c: "",
    d: ""
}

var q3 = {
    q: "",
    a: "",
    b: "",
    c: "",
    d: ""
}
var questions = [q1, q2, q3];
var qNum = 0;

var nextQuestion = function () {
    if(qNum<questions.length){
        $("body").append(`<section id='q${qNum}'>`);
        var questionEl = $(`q${qNum}`);
    }
    else{
        //end quiz and display high scores
    }
}

$("body").append("<nav>");
$("nav").append("<a href=''>View High Scores");
$("nav").append(`<p>Time: ${timeRemaining}</p>`);
$("body").append(`<section id="intro-section">`);
var introSectionEl = $("#intro-section");
introSectionEl.append("<h1>Code Quiz Challenge");
introSectionEl.append("<p>Try your best to finish the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!");
introSectionEl.append("<button id='start-btn'>Start Quiz!");

$("#start-btn").on("click",function(){
    introSectionEl[0].style.visibility = "hidden";
    nextQuestion();
});