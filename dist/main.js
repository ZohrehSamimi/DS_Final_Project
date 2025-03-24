var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SpeechRecognizer } from "./SpeechRecognition";
import { speak } from "./TextToSpeech";
import { GameLogic } from "./GameLogic";
const recognizer = new SpeechRecognizer();
const game = new GameLogic();
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
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
                const result = yield recognizer.listen();
                console.log("🧑 You said:", result);
                alert(`You said: ${result}`);
                const isValid = game.processUserVerse(result);
                if (isValid) {
                    const aiVerse = game.getNextAIVerse();
                    console.log("🤖 AI replies:", aiVerse);
                    setTimeout(() => speak(aiVerse), 500);
                }
                else {
                    speak("Your verse is invalid. Try again.");
                }
            }
            catch (err) {
                console.error("❌ Recognition error:", err);
            }
        }));
    }
});
