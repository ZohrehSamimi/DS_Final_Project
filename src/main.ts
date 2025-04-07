import { SpeechRecognizer } from "./SpeechRecognition";
import { speak } from "./TextToSpeech";
import { GameLogic } from "./gameLogic";

function addVerse(text: string, speaker: "user" | "ai") {
  const history = document.getElementById("verse-history");
  if (history) {
    const div = document.createElement("div");
    div.className = 'bubble ${speaker}';
    div.textContent = text;
    history.appendChild(div);
    history.scrollTop = history.scrollHeight;
  }
}
// Load poetry dataset
async function loadPoetry(): Promise<Record<string, string[]>> {
  const res = await fetch("/poetry.json");
  return await res.json();
}
function updateExpectedLetter(letter: string) {
  const el = document.getElementById("expected-letter");
  if (el) {
    el.textContent = `🎯 Start with: ${letter.toUpperCase()}`;
  }
}


let recognizer: SpeechRecognizer;
let game: GameLogic;

document.addEventListener("DOMContentLoaded", async () => {
  const poetry = await loadPoetry();
  recognizer = new SpeechRecognizer("en-US");
  game = new GameLogic(poetry);

  const startBtn = document.getElementById("start-btn");

  startBtn?.addEventListener("click", async () => {
    if (game.getState().currentTurn === "ai") {
      const aiVerse = game.startGame();
      console.log("🤖 AI says:", aiVerse);
      speak(aiVerse);
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

        const aiVerse = game.getNextAIVerse();

        if (!aiVerse) {
          speak("I have no verse for that letter. You win!");
          return;
        }

        console.log("🤖 AI replies:", aiVerse);
        setTimeout(() => speak(aiVerse), 500);
        addVerse(aiVerse, "ai");
        updateExpectedLetter(game.getState().lastLetter); 
      } else {
        speak("Your verse is invalid. Try again.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      speak("I didn't catch that. Please try again.");
    }
  });
});
