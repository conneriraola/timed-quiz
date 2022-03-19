const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
    highScores.map(score => {
    return "<li>$[score.name] - $[score.score]</li>";
}).join("");