// Define an array of possible eye-related problems (9 problems)
const eyeProblems = [
  "Eye Strain: Discomfort and difficulty focusing after extended use.",
  "Dry Eyes: Irritation, redness, and a burning sensation.",
  "Blurry Vision: Temporary difficulty in focusing on objects.",
  "Headaches: Tension headaches from prolonged focus on the screen.",
  "Neck and Shoulder Pain: Poor posture leading to muscle strain.",
  "Increased Sensitivity to Light: Heightened sensitivity after long sessions.",
  "Increased Risk of Myopia: Long-term screen use may cause nearsightedness.",
  "Double Vision: Trouble seeing objects clearly after extended screen time.",
  "Disrupted Sleep Patterns: Blue light exposure can interfere with sleep.",
];
let timer = null;
let timeLeft = 20 * 60; // 20 minutes
let score = localStorage.getItem("score")
  ? parseInt(localStorage.getItem("score"))
  : 0;
let flowerStage = localStorage.getItem("flowerStage")
  ? parseInt(localStorage.getItem("flowerStage"))
  : 1;

document.getElementById("score").innerText = score;
document.getElementById("flowerStage").src = `./photos/plant${flowerStage}.png`;

document.getElementById("startTimer").addEventListener("click", function () {
  if (timer === null) {
    timer = setInterval(updateTimer, 1000);
  }
});

document.querySelector(".pop-up-button").addEventListener("click", function () {
  document.querySelector(".pop-up").style.display = "none";
  document.querySelector(".flower").style.display = "block";
  timer = setInterval(updateTimer, 1000);
});

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  } else {
    clearInterval(timer);

    document.querySelector(".pop-up").style.display = "flex";

    score++;
    document.getElementById("score").innerText = score;

    // Store updated score in localStorage
    localStorage.setItem("score", score);
    showRandomEyeProblem();

    // Update flower growth
    function updateFlower() {
      if (flowerStage >= 1 && flowerStage < 10) {
        document.getElementById(
          "flowerStage"
        ).src = `./photos/plant${flowerStage}.png`;
        flowerStage++;

        // Store updated flowerStage in localStorage
        localStorage.setItem("flowerStage", flowerStage);
      } else {
        clearInterval(timer);
        timer = null;
        flowerStage = 1;
        score = 0;

        // Reset score and flowerStage in localStorage
        localStorage.setItem("score", score);
        localStorage.setItem("flowerStage", flowerStage);

        document.querySelector(".pop-up").style.display = "none";
        document.getElementById("score").innerText = score;
        document.querySelector(".flower").style.display = "none";
      }
    }
    updateFlower();

    // Reset Timer
    timeLeft = 20 * 60;
    document.getElementById("timer").innerText = "20:00";
  }
}
function showRandomEyeProblem() {
  const problemElement = document.getElementById("eyeProblem");

  // Ensure the score is within the valid range (1 to 9)
  if (score > 0 && score <= eyeProblems.length) {
    const randomProblem = eyeProblems[score - 1]; // Fetch problem based on score

    // Display the problem on the screen
    problemElement.innerText = randomProblem;
    problemElement.style.display = "block"; // Show the element
  } else {
    // If score is out of range, hide the problem display
    problemElement.style.display = "none";
  }
}

// Call the function after updating the score
showRandomEyeProblem();
