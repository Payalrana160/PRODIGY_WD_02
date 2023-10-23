let running = false;
let startTime;
let interval;
let laps = [];

function startStop() {
    if (running) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1] : 0);
        interval = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Stop";
    }
    running = !running;
}

function reset() {
    clearInterval(interval);
    document.getElementById("display").textContent = "00:00.000";
    document.getElementById("startStop").textContent = "Start";
    running = false;
    laps = [];
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (running) {
        const currentTime = Date.now() - startTime;
        laps.push(currentTime);
        const lapTime = formatTime(currentTime);
        const lapList = document.getElementById("laps");
        const listItem = document.createElement("li");
        listItem.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapList.appendChild(listItem);
    }
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(currentTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}
