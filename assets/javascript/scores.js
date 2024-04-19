const userInitials = localStorage.getItem("initial");
const userScores = localStorage.getItem("score");
const clearBtn = document.getElementById("clear");
const highScoreListElement = document.getElementById("highscores");

if (userInitials && userScores) {
    highScoreListElement.innerHTML += `<li>${userInitials} - ${userScores}</li>`;
}

clearBtn.addEventListener("click", () => {
    highScoreListElement.innerHTML = "";
});

function saveHighscore(initials, score) {
    const existingInitials = localStorage.getItem("initials");
    const existingScores = localStorage.getItem("scores");

    let initialsArray = existingInitials ? JSON.parse(existingInitials) : [];
    let scoresArray = existingScores ? JSON.parse(existingScores) : [];

    initialsArray.push(initials);
    scoresArray.push(score);

    localStorage.setItem("initials", JSON.stringify(initialsArray));
    localStorage.setItem("scores", JSON.stringify(scoresArray));
}


