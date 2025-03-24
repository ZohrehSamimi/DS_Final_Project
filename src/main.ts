// Updated main.ts
import { SpeechRecognizer } from "./SpeechRecognition";
import { speak } from "./TextToSpeech";

const recognizer = new SpeechRecognizer();
// Change to English response
const responseToSay = "Hello! Let's start the game!";

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  if (!startBtn) return;

  startBtn.addEventListener("click", async () => {
    console.log("🎤 Listening started...");
    try {
      const result = await recognizer.listen();
      console.log("🗣️ You said:", result);
      alert(`You said: ${result}`);
      
      // Now AI replies in English
      setTimeout(() => {
        speak(responseToSay, "en-US"); // Specify English language
      }, 500);
      
    } catch (err) {
      console.error("❌ Error in recognition:", err);
      alert("Could not recognize speech.");
    }
  });
});