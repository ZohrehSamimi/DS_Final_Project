import { SpeechRecognizer } from "./SpeechRecognition";
import { speak } from "./TextToSpeech";
import { GameLogic } from "./GameLogic";

const recognizer = new SpeechRecognizer();
const game = new GameLogic();

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");

  if (startBtn) {
    startBtn.addEventListener("click", async () => {
      if (game.getState().currentTurn === "ai") {
        // AI starts the game
        const aiVerse = game.startGame();
        console.log("🤖 AI says:", aiVerse);
        speak(aiVerse);
        return;
      }

      // User's turn
      console.log("🎤 Listening started...");
      try {
        const result = await recognizer.listen();
        console.log("🧑 You said:", result);
        alert(`You said: ${result}`);

        const isValid = game.processUserVerse(result);
        if (isValid) {
          const aiVerse = game.getNextAIVerse();
          console.log("🤖 AI replies:", aiVerse);
          setTimeout(() => speak(aiVerse), 500);
        } else {
          speak("Your verse is invalid. Try again.");
        }
      } catch (err) {
        console.error("❌ Recognition error:", err);
      }
    });
  }
});
