export function speak(text, language = "en-US") {
    if (window.responsiveVoice) {
        // Use ResponsiveVoice if available
        let voice = "UK English Male";
        if (language === "en-US") {
            voice = "US English Male";
        }
        console.log(`Using ResponsiveVoice with voice: ${voice}`);
        window.responsiveVoice.speak(text, voice);
    }
    else {
        // Fallback to browser's built-in speech synthesis
        if (!window.speechSynthesis) {
            console.error("Speech synthesis not supported");
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        // Try to find an English voice
        const voice = voices.find(v => v.lang.includes("en-US"));
        if (voice) {
            utterance.voice = voice;
        }
        console.log(`Using browser speech synthesis with language: ${language}`);
        window.speechSynthesis.speak(utterance);
    }
}
export function stopSpeaking() {
    if (window.responsiveVoice && window.responsiveVoice.isPlaying()) {
        window.responsiveVoice.cancel();
    }
    else if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
}
