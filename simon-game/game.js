const buttonColors = ["red", "blue", "green", "yellow"];

const epicFail = "wrong";

let gamePattern = [];
let userClickedPattern = [];

let level = 0;

$(document).on("keypress", function (evt) {
  if (evt.key == "a" && level === 0) {
    $("h1").text("Level " + level);
    nextSequence();
  }
});

$(".btn").on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  gameHandler();
});

///////////////// FUNCTIONS //////////////////////////////

function gameHandler() {
  let lastClicked = userClickedPattern[userClickedPattern.length - 1];
  let gamePatternCheck = gamePattern[userClickedPattern.length - 1];
  // console.log(lastClicked + " " + sameLocOnGamePattern);
  if (lastClicked !== gamePatternCheck) {
    playSound(epicFail);
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    gameOver();
  } else if (
    gamePattern[gamePattern.length - 1] === lastClicked &&
    gamePattern.length === userClickedPattern.length
  ) {
    userClickedPattern = [];
    setTimeout(nextSequence, 500);
  }
}

function gameOver() {
  $("body").addClass("game-over");
  $("h1").text("GAME OVER!");
  setTimeout(() => {
    $("body").removeClass("game-over");

    $("h1").text("GAME OVER! Press A to Try Again...");
  });
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // The following method chain creates a flashing animation on the buttons
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  let sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
