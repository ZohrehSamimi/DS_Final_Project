var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Updated main.ts
import { SpeechRecognizer } from "./SpeechRecognition";
import { speak } from "./TextToSpeech";
const recognizer = new SpeechRecognizer();
// Change to English response
const responseToSay = "Hello, I am an artificial intelligence. How can I help you?";
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    if (!startBtn)
        return;
    startBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("🎤 Listening started...");
        try {
            const result = yield recognizer.listen();
            console.log("🗣️ You said:", result);
            alert(`You said: ${result}`);
            // Now AI replies in English
            setTimeout(() => {
                speak(responseToSay, "en-US"); // Specify English language
            }, 500);
        }
        catch (err) {
            console.error("❌ Error in recognition:", err);
            alert("Could not recognize speech.");
        }
    }));
});
