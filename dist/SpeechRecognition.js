// src/SpeechRecognition.ts
export class SpeechRecognizer {
    recognition;
    constructor(language = "fa-IR") {
        const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionClass) {
            throw new Error("Web Speech API is not supported in this browser.");
        }
        // Create instance of recognition
        this.recognition = new SpeechRecognitionClass();
        this.recognition.lang = language;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        // Optional logs
        this.recognition.onstart = () => {
            console.log("🎙️ Speech recognition has started.");
        };
        this.recognition.onspeechstart = () => {
            console.log("🗣️ Speech detected.");
        };
        this.recognition.onspeechend = () => {
            console.log("🤐 Speech ended.");
        };
        this.recognition.onend = () => {
            console.log("🛑 Speech recognition has ended.");
        };
    }
    listen() {
        return new Promise((resolve, reject) => {
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.trim();
                resolve(transcript);
            };
            this.recognition.onerror = (event) => {
                console.error("❌ Error event:", event);
                reject(`Speech recognition error: ${event.error}`);
            };
            this.recognition.start();
        });
    }
    stop() {
        this.recognition.stop();
    }
}
