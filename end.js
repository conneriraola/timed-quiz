const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("SaveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
console.log(highScores);

finalScore.textContent = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: finalScore.textContent,
        name: username.value
    };
    highScores.push(score);
    highScores.sort ( (a,b) => b.score - a.score)
    highScores.splice(5);  

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("./index.html");
};