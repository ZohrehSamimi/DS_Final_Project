// src/GameLogic.ts

export type Turn = "user" | "ai";

export interface GameState {
  currentTurn: Turn;
  lastLetter: string;
  userLastInput?: string;
  aiLastVerse?: string;
}

export class GameLogic {
  private state: GameState;

  constructor() {
    this.state = {
      currentTurn: "ai",
      lastLetter: "",
    };
  }

  // AI starts with a predefined verse
  startGame(): string {
    const aiVerse = "Every end is a new beginning"; // ← placeholder
    this.state.aiLastVerse = aiVerse;
    this.state.lastLetter = this.getLastLetter(aiVerse);
    this.state.currentTurn = "user";
    return aiVerse;
  }

  // User speaks a verse; we store and validate
  processUserVerse(verse: string): boolean {
    const firstLetter = this.getFirstLetter(verse);
    if (firstLetter.toLowerCase() === this.state.lastLetter.toLowerCase()) {
      this.state.userLastInput = verse;
      this.state.currentTurn = "ai";
      this.state.lastLetter = this.getLastLetter(verse);
      return true; // valid
    }
    return false; // invalid
  }

  // AI replies with a verse (dummy for now)
  getNextAIVerse(): string {
    const aiVerse = "Go with the flow"; // ← later this will come from poetry.json
    this.state.aiLastVerse = aiVerse;
    this.state.currentTurn = "user";
    this.state.lastLetter = this.getLastLetter(aiVerse);
    return aiVerse;
  }

  getFirstLetter(text: string): string {
    return text.trim()[0];
  }

  getLastLetter(text: string): string {
    const cleaned = text.trim().replace(/[.,!?]$/, "");
    return cleaned[cleaned.length - 1];
  }

  getState(): GameState {
    return this.state;
  }
}
