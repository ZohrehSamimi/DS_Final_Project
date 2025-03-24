// src/TextToSpeech.ts

export function speak(text: string, lang: string = "fa-IR") {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  }
  