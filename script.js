// ============================
// Timer Elements
// ============================

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

// ============================
// Buttons
// ============================

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

// ============================
// Lap Elements
// ============================

const laps = document.getElementById("laps");
const emptyState = document.getElementById("emptyState");

// ============================
// Stopwatch Variables
// ============================

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let isRunning = false;
let lapCount = 0;

function updateDisplay() {

    let time = elapsedTime;

    const hrs = Math.floor(time / 3600000);
    time %= 3600000;

    const mins = Math.floor(time / 60000);
    time %= 60000;

    const secs = Math.floor(time / 1000);
    const ms = time % 1000;

    hours.textContent = String(hrs).padStart(2, "0");
    minutes.textContent = String(mins).padStart(2, "0");
    seconds.textContent = String(secs).padStart(2, "0");
    milliseconds.textContent = String(ms).padStart(3, "0");

}

function formatTime(time){

    const hrs = Math.floor(time / 3600000);

    const mins = Math.floor((time % 3600000) / 60000);

    const secs = Math.floor((time % 60000) / 1000);

    const ms = time % 1000;

    return `${String(hrs).padStart(2,"0")}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}.${String(ms).padStart(3,"0")}`;

}

function startStopwatch() {

    if (isRunning) return;

    startTime = Date.now() - elapsedTime;

    timer = setInterval(() => {

        elapsedTime = Date.now() - startTime;

        updateDisplay();

    }, 10);

    isRunning = true;
    updateButtonState();
    document.querySelector(".card").classList.add("running");
}
function pauseStopwatch() {

    if (!isRunning) return;

    clearInterval(timer);
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
    isRunning = false;
    updateButtonState();
    document.querySelector(".card").classList.remove("running");
}
function resetStopwatch() {

    clearInterval(timer);

    startTime = 0;
    elapsedTime = 0;

    isRunning = false;
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';

    updateDisplay();
    updateButtonState();

    laps.innerHTML = "";

    lapCount = 0;
    document.querySelector(".card").classList.remove("running");
    emptyState.style.display = "block";
}   
function recordLap(){

    if(!isRunning) return;

    lapCount++;

    emptyState.style.display = "none";

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapCount}</span>
        <span>${formatTime(elapsedTime)}</span>
    `;

    laps.prepend(li);

}
startBtn.addEventListener("click", startStopwatch);

pauseBtn.addEventListener("click", pauseStopwatch);

resetBtn.addEventListener("click", resetStopwatch);

lapBtn.addEventListener("click", recordLap);

function updateButtonState() {

    startBtn.disabled = isRunning;

    pauseBtn.disabled = !isRunning;

    lapBtn.disabled = !isRunning;


}
updateButtonState();

//keyboard shortcuts
document.addEventListener("keydown", (event) => {

    // Prevent scrolling when Space is pressed
    if (event.code === "Space") {
        event.preventDefault();

        if (isRunning) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    }

    // Record Lap
    if (event.key.toLowerCase() === "l" && isRunning) {
        recordLap();
    }

    // Reset Stopwatch
    if (event.key.toLowerCase() === "r") {
        resetStopwatch();
    }

});