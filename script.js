// An array to store the intervals of active timers
const activeTimers = [];
const remainingSeconds = []; // Array to store remaining seconds for each timer

// Function to start a new timer with the given hours, minutes, and seconds
function startTimer(hours, minutes, seconds) {
    // Convert the total time to seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Check if the total time is greater than zero
    if (totalSeconds > 0) {
        let remaining = totalSeconds;

        // Create a new interval to decrement the timer every second
        const timerInterval = setInterval(() => {
            remaining--;

            // If the timer reaches zero, clear the interval, play an audio alert, and remove the timer
            if (remaining <= 0) {
                clearInterval(timerInterval);
                playAudioAlert();
                removeTimer(timerInterval);
            } else {
                // Update the timer display with the remaining time
                updateTimerDisplay(timerInterval, remaining);
            }
        }, 1000);

        // Add the new timer interval to the active timers array and store the remaining seconds
        activeTimers.push(timerInterval);
        remainingSeconds.push(remaining);
        updateActiveTimersDisplay();
    }
}

// Function to update the display of a timer with the remaining time
function updateTimerDisplay(timerInterval, remainingSeconds) {
    const timerElement = document.getElementById(`timer-${timerInterval}`);
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to remove a timer from the active timers list and update the display
function removeTimer(timerInterval) {
    const index = activeTimers.indexOf(timerInterval);
    if (index !== -1) {
        activeTimers.splice(index, 1);
        remainingSeconds.splice(index, 1); // Remove remaining seconds for the timer
        updateActiveTimersDisplay();
    }
}

// Function to update the display of all active timers
function updateActiveTimersDisplay() {
    const activeTimersContainer = document.getElementById('activeTimers');
    activeTimersContainer.innerHTML = '';

    // Iterate through all active timers and create a display for each one
    activeTimers.forEach((timerInterval, index) => {
        const timerElement = document.createElement('div');
        timerElement.setAttribute('class', 'timer');
        timerElement.setAttribute('id', `timer-${timerInterval}`);
        activeTimersContainer.appendChild(timerElement);

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Timer';
        stopButton.setAttribute('class', 'stop-btn');
        stopButton.addEventListener('click', () => removeTimer(timerInterval));
        timerElement.appendChild(stopButton);

        // Update the display for each timer with the remaining time from the array
        updateTimerDisplay(timerInterval, remainingSeconds[index]);
    });
}

// Function to play the audio alert when a timer ends
function playAudioAlert() {
    // Add code here to play the audio alert of your choice
}

// Event listener for the "Start New Timer" button
document.getElementById('startTimer').addEventListener('click', () => {
    // Get user input for hours, minutes, and seconds
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);

    // Start the new timer with the user-provided time
    startTimer(hours, minutes, seconds);
});


