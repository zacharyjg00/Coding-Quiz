// Global variables that are used and tracked throughout the quiz
let secondsLeft = 75;
let questionIdx = 0;
let score = 0;
const numOfQuestions = 10;
let timerInterval;

// Selectors for the header items
let timeEl = document.querySelector(".timer");
let viewHighscores = document.querySelector(".view-highscores");

// Selectors for the default page
let defaultBlock = document.querySelector(".default");
let startButton = document.querySelector("#start-button");

// Selectors for the questions pages
let questionBlock = document.querySelector(".question");
let questionText = document.querySelector("#question-text");
let answerA = document.querySelector("#answer-a");
let answerB = document.querySelector("#answer-b");
let answerC = document.querySelector("#answer-c");
let answerD = document.querySelector("#answer-d");
let correctOrWrongText = document.querySelector("#correct-or-wrong");

// Selectors for the score screen where the user can enter their name or initials
let scoreScreenBlock = document.querySelector(".score-screen");
let scoreText = document.querySelector("#score-text");
let initialsInput = document.querySelector("#initials-input");
let formInput = document.querySelector("#initials");
let initialsButton = document.querySelector("#submit-initials");

// Selectors for the scoreboard section of the webpage
let highscoresBlock = document.querySelector(".highscores");
let highscoresList = document.querySelector("#highscores-list");
let defaultButton = document.querySelector("#default-display");
let resetScoresButton = document.querySelector("#score-reset");


// Array of objects that contains all of the questions in the quiz
const questions = [
    {
        question: "What is the American military rifle that is famous for the 'ping' sound it makes when out of bullets?",
        answerA: "Springfield M1903",
        answerB: "M1 Garand",
        answerC: "M1A1 Carbine",
        answerD: "Colt M1911",
        correctAnswer: "answer-b"
    },
    {
        question: "Who assassinated Archnduke Francis Franz Ferdinand which lead to the beginning of World War I?",
        answerA: "Serbian Black Hand",
        answerB: "Lee Harvey Oswald",
        answerC: "Clifford the Big Red Dog",
        answerD: "The Nazis",
        correctAnswer: "answer-a"
    },
    {
        question: "What does the 'Day of Infamy' refer to in history?",
        answerA: "The bombing of Pearl Harbor",
        answerB: "9/11",
        answerC: "The Holocaust",
        answerD: "The Rape of Nanking",
        correctAnswer: "answer-a"
    },
    {
        question: "What was the name of the documents that officially ended World War I?",
        answerA: "The Declaration of Independence",
        answerB: "The Constitution",
        answerC: "The Treaty of Versailles",
        answerD: "The Magna Carta",
        correctAnswer: "answer-c"
    },
    {
        question: "Who was the leader of Italy during World War II?",
        answerA: "Saint Thomas Aquinas",
        answerB: "Leonardo da Vinci",
        answerC: "Papa John",
        answerD: "Benito Mussolini",
        correctAnswer: "answer-d"
    },
    {
        question: "What war features the most American casualties?",
        answerA: "The Civil War",
        answerB: "World War I",
        answerC: "World War II",
        answerD: "The Revolutionary War",
        correctAnswer: "answer-a"
    },
    {
        question: "How many different models of the Mosin Nagant are there?",
        answerA: "2",
        answerB: "52",
        answerC: "44",
        answerD: "9",
        correctAnswer: "answer-c"
    },
    {
        question: "Who was president of the USA during the start of World War II?",
        answerA: "Barack Obama",
        answerB: "Franklin Delano Roosevelt",
        answerC: "Richard Nixon",
        answerD: "George Washington",
        correctAnswer: "answer-b"
    },
    {
        question: "What are the documents that establish international standards for humanitarian treatment of war?",
        answerA: "Mein Kampf",
        answerB: "The Atlantis Conventions",
        answerC: "The Vatican Conventions",
        answerD: "The Geneva Conventions",
        correctAnswer: "answer-d"
    },
    {
        question: "What is the name of the German tank groups during World War II?",
        answerA: "The Panzer Divisions",
        answerB: "The Luftwaffe",
        answerC: "The Spetsnaz",
        answerD: "The Wienerschnitzel",
        correctAnswer: "answer-a"
    }
]

// Timer function that keeps track of the time left for the quiz in the top right corner of the webpage
function timer() {
    timerInterval = setInterval(function () {
        timeEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeEl.textContent = "Time: " + secondsLeft;
            displayScore();
        } else {
            secondsLeft--;
            timeEl.textContent = "Time: " + secondsLeft;
        }
    }, 1000);
}

// All of the display functions which set the display in the css which determines what section of the html is visible
function displayDefault() {
    highscoresBlock.style.display = "none";
    defaultBlock.style.display = "flex";
}

function displayQuestion() {
    questionText.textContent = questions[questionIdx].question;
    answerA.textContent = questions[questionIdx].answerA;
    answerB.textContent = questions[questionIdx].answerB;
    answerC.textContent = questions[questionIdx].answerC;
    answerD.textContent = questions[questionIdx].answerD;
}

function displayScore() {
    questionBlock.style.display = "none";
    scoreScreenBlock.style.display = "flex";
    scoreText.textContent = "Congratulations on completing the quiz! You got a score of " + score + "! Please press submit to post your score to the leaderboard."
}

//Grabs the stored name and score out of local storage and puts it inside of the highscores-list
function displayHighscores() {
    scoreScreenBlock.style.display = "none";
    defaultBlock.style.display = "none";
    highscoresBlock.style.display = "flex";
    highscoresList.innerHTML = "";
    for(let i = 0; i < localStorage.length; i++) {
        const newLi = document.createElement("li");
        newLi.textContent = localStorage.key(i) + " - " + localStorage.getItem(localStorage.key(i));
        highscoresList.appendChild(newLi);
    }
}

// Function to check whether or not the last question has been asked or not
function quizDone() {
    if (questionIdx === numOfQuestions) {
        return true;
    } else {
        return false;
    }
}

// Checks if the answer is correct with the correctAnswer attribute in the question object
function isAnswerCorrect(answer) {
    if (answer === questions[questionIdx].correctAnswer) {
        score++;
        return true;
    } else {
        secondsLeft -= 5;
        setTimeout(timerInterval, secondsLeft);
        return false;
    }
}

// All of the event listeners for all of the buttons on the pages
// Upon start, resets all variables to their defaults to make sure every new quiz is the same
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    secondsLeft = 75;
    questionIdx = 0;
    score = 0;
    timer();
    defaultBlock.style.display = "none";
    questionBlock.style.display = "flex";
    displayQuestion();
});

// Allows the user to click the View Highscores in the top left corner of the webpage and it displays the previous stored scores
viewHighscores.addEventListener("click", function(event) {
    event.preventDefault();
    displayHighscores();
});

questionBlock.addEventListener("click", function (event) {
    event.preventDefault();
    let answer = event.target.id;
    if (answer === "answer-a" || answer === "answer-b" || answer === "answer-c" || answer === "answer-d") {
        let correctOrWrong = isAnswerCorrect(answer);

        //An if-else statement that will display whether the user correctly answered the question or incorrectly answered the question
        //The use of the timer makes sure that the "Correct!" or "Wrong!" message is only on screen for a short while
        if (correctOrWrong) {
            correctOrWrongText.textContent = "Correct!";
        } else {
            correctOrWrongText.textContent = "Wrong!";
        }
        let resultTime = 1;
        let answerInterval = setInterval(function () {
            if (resultTime === 0) {
                clearInterval(answerInterval);
                correctOrWrongText.textContent = "";
            } else {
                resultTime--;
            }
        }, 500);

        questionIdx++;
        if (quizDone()) {
            displayScore();
            clearInterval(timerInterval);
        } else {
            displayQuestion();
        }
    }
});

// Takes the input given by the user and puts it into local storage
initialsButton.addEventListener("click", function (event) {
    event.preventDefault();
    let inputVal = document.getElementById("initials").value;
    localStorage.setItem(inputVal, score);
    displayHighscores();
});

// Displays the main webpage upon using the Go Back button
defaultButton.addEventListener("click", function(event) {
    event.preventDefault();
    displayDefault();
    formInput.value = "";
});

// Clears the list of all stored values
resetScoresButton.addEventListener("click", function(event) {
    event.preventDefault();
    highscoresList.innerHTML = "";
    localStorage.clear();
});

