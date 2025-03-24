
export class SpeechRecognizer {
    private recognition: SpeechRecognition;
  
    constructor(language: string = "fa-IR") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
  
      if (!SpeechRecognition) {
        throw new Error("Web Speech API is not supported in this browser.");
      }
  
      this.recognition = new SpeechRecognition();
      this.recognition.lang = language;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    }
  
    listen(): Promise<string> {
      return new Promise((resolve, reject) => {
        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.trim();
          resolve(transcript);
        };
  
        this.recognition.onerror = (event) => {
          reject(`Speech recognition error: ${event.error}`);
        };
  
        this.recognition.onend = () => {
          // Optionally handle end
        };
  
        this.recognition.start();
      });
    }
  
    stop(): void {
      this.recognition.stop();
    }
  }
  