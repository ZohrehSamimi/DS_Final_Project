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
  private poetry: Record<string, string[]>;

  constructor(poetry: Record<string, string[]>) {
    this.poetry = poetry;
    this.state = {
      currentTurn: "ai",
      lastLetter: "",
    };
  }

  startGame(): string {
    const letters = Object.keys(this.poetry);
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const verse = this.getVerseStartingWith(randomLetter);
    this.state.aiLastVerse = verse;
    this.state.lastLetter = this.getLastLetter(verse);
    this.state.currentTurn = "user";
    return verse;
  }

  processUserVerse(verse: string): boolean {
    const firstLetter = this.getFirstLetter(verse).toLowerCase();
    const expected = this.state.lastLetter.toLowerCase();
    console.log(`🔍 Comparing: "${firstLetter}" vs "${expected}"`);
  
    if (firstLetter === expected) {
      this.state.userLastInput = verse;
      this.state.currentTurn = "ai";
      this.state.lastLetter = this.getLastLetter(verse);
      return true;
    }
  
    return false;
  }

  getNextAIVerse(): string {
    const verse = this.getVerseStartingWith(this.state.lastLetter);
    this.state.aiLastVerse = verse;
    this.state.currentTurn = "user";
    this.state.lastLetter = this.getLastLetter(verse);
    return verse;
  }

  getVerseStartingWith(letter: string): string {
    const options = this.poetry[letter.toLowerCase()];
    if (!options || options.length === 0) {
      return "I don't have a verse for that letter.";
    }
    const verse = options[Math.floor(Math.random() * options.length)];
    return verse;
  }

  getFirstLetter(text: string): string {
    return text.trim().replace(/[^a-zA-Z]/g, "")[0];
  }

  getLastLetter(text: string): string {
  const cleaned = text.trim().replace(/[^a-zA-Z]+$/, "");
  return cleaned[cleaned.length - 1];
}

  getState(): GameState {
    return this.state;
  }
}
