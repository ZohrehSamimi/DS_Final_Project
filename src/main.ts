
import { SpeechRecognizer } from "./SpeechRecognition";

const recognizer = new SpeechRecognizer();

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  if (!startBtn) return;

  startBtn.addEventListener("click", async () => {
    try {
      const result = await recognizer.listen();
      console.log("🗣️ You said:", result);
      // TODO: pass to your game logic
    } catch (err) {
      console.error(err);
    }
  });
});
