const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');
// DOM Adding ends


// Input autofocus


const words = [
    "Run",
    "Jump",
    "Test",
    "Supper",
    "Amazing",
    "Beautiful",
    "Special",
    "Worthy",
    "Unworthy",
    "Simplified",
    "Specified",
    "Unlimited",
    "Walking",
    "Under",
    "Tree",
    "Never",
    "Development",
    "Comprehnsive",
    "Competative",
    "Laughing",
    "Difficult"
];

// Init word
let randomword;

// Init time
let time = 10;

// Init score
let score = 0;

//Set difficulty to value in local Storage or medium
let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';

// set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';

// Generate random words from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to the DOM

function addWordToDOM() {
    randomword = getRandomWord();

    word.innerHTML = randomword;
}
// Initail call function
addWordToDOM();

// Update score 

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
};

// To run the timer
function runInterval() { setInterval(updateTime, 1000) };

// Onclick on input the timer will start
text.addEventListener('click', () => runInterval());
//update time 
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    // Stop interval
    if (time === 0) {
        clearInterval(runInterval);

        // Game over
        gameOver();
    }
};

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time Ran Our</h1>
    <p>Your Final Score Is ${score}</p>
    <button onclick="location.reload()">Reset Game</button>
    `;

    // Show game over overlay
    endgameEl.style.display = 'block';
};

// Adding and removing the setting through the button
function addSetting() { settings.classList.toggle('hide') };

// Event listeners

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomword) {
        addWordToDOM();
        updateScore();

        // clear 
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 3;
        } else if (difficulty === 'medium') {
            time += 5;
        } else {
            time += 7
        }
        updateTime();
    }
});

// Toggle settings 
settingsBtn.addEventListener('click', addSetting);

// Onchange form event listener
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});