import { SpeechRecognizer } from "./SpeechRecognition";
import { speak } from "./TextToSpeech";
import { GameLogic } from "./gameLogic";
let recognizer;
let game;
let userScore = 0;
let aiScore = 0;
function addVerse(text, speaker) {
    const history = document.getElementById("verse-history");
    if (history) {
        const div = document.createElement("div");
        div.className = `bubble ${speaker}`;
        div.textContent = text;
        history.appendChild(div);
        history.scrollTop = history.scrollHeight;
    }
}
// Load poetry dataset
async function loadPoetry() {
    const res = await fetch("/poetry.json");
    return await res.json();
}
function updateScoreDisplay(user, ai) {
    const scoreEl = document.getElementById("user-score");
    const aiEl = document.getElementById("ai-score");
    if (scoreEl)
        scoreEl.textContent = String(user);
    if (aiEl)
        aiEl.textContent = String(ai);
}
function updateExpectedLetter(letter) {
    const el = document.getElementById("expected-letter");
    if (el) {
        el.textContent = `🎯 Start with: ${letter.toUpperCase()}`;
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    const poetry = await loadPoetry();
    recognizer = new SpeechRecognizer("en-US");
    game = new GameLogic(poetry);
    const startBtn = document.getElementById("start-btn");
    document.getElementById("theme-select")?.addEventListener("change", (e) => {
        const selectedTheme = e.target.value;
        document.body.className = `theme-${selectedTheme}`;
    });
    startBtn?.addEventListener("click", async () => {
        if (game.getState().currentTurn === "ai") {
            const aiVerse = game.startGame();
            console.log("🤖 AI replies:", aiVerse);
            setTimeout(() => speak(aiVerse), 500);
            addVerse(aiVerse, "ai");
            updateExpectedLetter(game.getState().lastLetter);
            return;
        }
        // User's turn
        console.log("🎤 Listening...");
        try {
            const result = await recognizer.listen();
            if (!result || result.trim().length === 0) {
                speak("I didn't hear anything. Please try again.");
                return;
            }
            console.log("🧑 You said:", result);
            const isValid = game.processUserVerse(result);
            if (isValid) {
                addVerse(result, "user");
                userScore++;
                updateScoreDisplay(userScore, aiScore);
                const aiVerse = game.getNextAIVerse();
                if (!aiVerse) {
                    speak("I have no verse for that letter. You win!");
                    return;
                }
                console.log("🤖 AI replies:", aiVerse);
                setTimeout(() => speak(aiVerse), 500);
                addVerse(aiVerse, "ai");
                aiScore++;
                updateScoreDisplay(userScore, aiScore);
                updateExpectedLetter(game.getState().lastLetter);
            }
            else {
                speak("Your answer doesn't start with the correct letter. Please try again.");
            }
        }
        catch (err) {
            console.error("❌ Error:", err);
            speak("I didn't catch that. Please try again.");
        }
    });
});
