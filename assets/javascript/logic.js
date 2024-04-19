import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC5V4t2_VNXUQfNmwLyjWVln2ZcEIof6rA";
const genAI = new GoogleGenerativeAI(API_KEY);

//* Get references to HTML elements *\\
const startButton = document.getElementById("start");
const nextButton = document.getElementById("next");
const startScreen = document.getElementById("start-screen");
const timerElement = document.getElementById("time");
const questionsContainer = document.getElementById("questions");
const questionsTitle = document.getElementById("question-title");
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initials = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");
const correctSound = new Audio("./assets/sfx/correct.mp3");
const incorrectSound = new Audio("./assets/sfx/incorrect.mp3");
const endSound = new Audio("./assets/sfx/oh.mp3");

//* Initialize variables *\\
let currentQuestionIndex = 0;
let score = 0;
let time = 300;
let timer;

//* Add event listener to start button to begin the quiz *\\
startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", nextQuestion);

//* Function to start the quiz *\\
function startQuiz(){
    // Gen questions from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = document.getElementById("myText").value;
    const result = model.generateContent(prompt);
    const response = result.response;
    console.log(response.text());
    // document.getElementById("output").innerText = response.text();

    // Hide start screen and show questions
    startScreen.classList.add("hide");
    questionsContainer.classList.remove("hide");
    startButton.classList.remove("hide");
    nextButton.classList.remove("hide");
    showQuestion();
    startTimer();
}

//* Function to display a question *\\
function showQuestion(){
    //* Retrieve current question and options *\\
    const { question, options } = questions[currentQuestionIndex];
    //* Display question title *\\
    questionsTitle.innerText = question;
    //* Clear previous choices *\\
    choicesContainer.innerHTML = '';
    //* Create buttons for each option *\\
    options.forEach((option, i) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("choice-btn");
        //* Add event listener to check answer when button is clicked *\\
        button.addEventListener("click", () => checkAnswer(i));
        choicesContainer.appendChild(button);
    });
}

//* Function to check selected answer *\\
function checkAnswer(index){
    const { options, correctAnswer } = questions[currentQuestionIndex];
    if (options[index] === correctAnswer){
        score++;
        correctSound.play();
        showFeedback(correctAnswer);
    } else {
        // time -= 10;
        incorrectSound.play();
        showFeedback(correctAnswer);
    }

    feedbackElement.classList.remove("hide");
}

function nextQuestion(){
    //* Move to next question*\\
    if (++currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        nextButton.classList.add("hide");
        endQuiz();
    }

    showFeedback("");
}

//* Function to start timer *\\
function startTimer(){
    timer = setInterval(() => {
        if (time <= 0){
            endQuiz();
        } else{
            timerElement.textContent = time--;
        }
    }, 1000);
}

//* Function to end the quiz *\\
function endQuiz(){
    endSound.play();
    clearInterval(timer);
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    feedbackElement.classList.add("hide");
    finalScore.innerText = score;
}

//* Function to display feedback *\\
function showFeedback(message){
    feedbackElement.innerText = "Đáp án: " + message;
}

//* Add event listener to submit button to save user initials and score, and redirect to highscores page *\\
submitButton.addEventListener("click", () => {
    localStorage.setItem("initial", initials.value);
    localStorage.setItem("score", score);
    location.href = "highscores.html";
});









