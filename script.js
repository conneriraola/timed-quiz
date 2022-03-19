var timerEl = document.getElementById("timer");
var secondsLeft = 30;
var timerInterval;

function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = "Time Left: " + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      alert("You're out of time! GAME OVER!");
    //   sendMessage();
    }
  }, 1000);
}
setTime();


const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};

let questions = [
    {
        question: "What is the capital of Washington State?",
        choice1: "Olympia",
        choice2: "Seattle",
        choice3: "Tacoma",
        choice4: "Spokane",
        answer: 1
    },
    {
        question: "NFL team in Seattle, WA?",
        choice1: "Cardinals",
        choice2: "Rams",
        choice3: "Raiders",
        choice4: "Seahawks",
        answer: 4
    },
    {
        question: "How many states are there in the USA?",
        choice1: "13",
        choice2: "50",
        choice3: "29",
        choice4: "51",
        answer: 2
    },
    {
        question: "What year was the Space Needle built?",
        choice1: "1955",
        choice2: "1942",
        choice3: "1961",
        choice4: "1966",
        answer: 3
    },
]

const CORRECT_BONUS = 100;

const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ... questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        clearInterval(timerInterval);
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    })

    availableQuestions.splice(questionIndex, 1);
 
    acceptingAnswers = true;
};

choices.forEach( choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        if (classToApply === "incorrect") {
            secondsLeft -= 5;
        }
        

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
        
    });
});


incrementScore = num => {
    score += num
    scoreText.innerText = score;
}

startGame();