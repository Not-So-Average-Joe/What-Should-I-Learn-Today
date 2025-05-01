const activities = [
    "Practice HTML & CSS",
    "Continue freeCodeCamp Responsive Web Design",
    "CS50p",
    "CS50w",
    "Solve Python problems on Codewars",
    "Read about JavaScript ES6",
    "Complete a small project",
];

const button = document.getElementById('spinnerButton');
const result = document.getElementById('result');
const unlockButton = document.getElementById('unlockButton');
const puzzleSection = document.getElementById('puzzleSection');
const puzzleInput = document.getElementById('puzzleInput');
const submitPuzzle = document.getElementById('submitPuzzle');
const puzzleFeedback = document.getElementById('puzzleFeedback');

let cooldownTimeout;

function startCooldown() {
    unlockButton.disabled = false; // Show unlock option
    cooldownTimeout = setTimeout(() => {
        button.disabled = false;
        unlockButton.disabled = true;
    }, 60 * 60 * 1000); // 1 hour
}

button.addEventListener('click', function () {
    button.disabled = true;
    result.textContent = "";

    let index = 0;
    let delay = 100;
    const slowdownRate = 1.1;
    const totalCycles = 20;

    function spinCycle(cycleCount) {
        if (cycleCount >= totalCycles) {
            const finalActivity = activities[index % activities.length];
            result.textContent = finalActivity;

            // Start cooldown and enable Unlock Early button
            startCooldown();
            return;
        }

        result.textContent = activities[index % activities.length];
        index++;

        setTimeout(() => {
            spinCycle(cycleCount + 1);
        }, delay);

        delay = delay * slowdownRate;
    }

    spinCycle(0);
});

unlockButton.addEventListener('click', () => {
    puzzleSection.classList.remove('hidden');
    generatePuzzle(); //
});

let currentAnswer;

function generatePuzzle() {
    console.log("Generating puzzle..."); // Add this

    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const operators = ["/", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let displayOperator = operator === "/" ? "÷" : "×";
    let questionText = `${a} ${displayOperator} ${b}`;
    let actualExpression = operator === "/" ? a / b : a * b;

    if (operator === "/" && a % b !== 0) {
        return generatePuzzle();
    }

    currentAnswer = actualExpression;
    puzzleFeedback.textContent = "";
    puzzleInput.value = "";

    const questionElement = document.getElementById("puzzleQuestion");
    console.log("Target element found?", questionElement); // Add this
    questionElement.textContent = `🧠 Solve: ${questionText}`;
}

submitPuzzle.addEventListener('click', () => {
    const answer = parseFloat(puzzleInput.value); // Use parseFloat for decimal answers
    if (answer === currentAnswer) {
        clearTimeout(cooldownTimeout);
        button.disabled = false;
        unlockButton.disabled = true;
        puzzleSection.classList.add('hidden');
        puzzleFeedback.textContent = "✅ Correct! Spinner re-enabled.";
    } else {
        puzzleFeedback.textContent = "❌ Try again!";
    }
});
