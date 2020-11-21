//Initialize variables
var timeRemaining = 0;
var introText = "Try your best to finish the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!";
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

$("body").append("<nav>");
$("nav").append("<a href=''>View High Scores");
$("nav").append(`<p>Time: ${timeRemaining}</p>`);
$("body").append(`<section>${introText}`);
