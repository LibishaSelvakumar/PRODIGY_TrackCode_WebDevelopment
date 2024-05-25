// DOM Elements
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

// Stopwatch variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Format time
function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Update display
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Start or stop the stopwatch
function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    elapsedTime = 0;
    updateDisplay();
    isRunning = false;
    lapsList.innerHTML = '';
}

// Record a lap
function lap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.prepend(lapItem);
    }
}

// Event listeners
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);