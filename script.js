var timerEl = document.getElementById("timer");
var secondsLeft = 60;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = "Time Left: " + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      alert("You're out of time!");
    //   sendMessage();
    }
  }, 1000);
}
setTime();