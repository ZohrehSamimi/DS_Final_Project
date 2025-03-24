import { SpeechRecognizer } from "../src/SpeechRecognition";


const recognizer = new SpeechRecognizer();

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  if (!startBtn) return;

  startBtn.addEventListener("click", async () => {
    console.log("🎤 Listening started...");
    try {
      const result = await recognizer.listen();
      console.log("🗣️ You said:", result);
      alert(`You said: ${result}`);
    } catch (err) {
      console.error("❌ Error in recognition:", err);
      alert("Could not recognize speech.");
    }
  });
});
