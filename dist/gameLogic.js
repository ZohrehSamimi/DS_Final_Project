// src/GameLogic.ts
export class GameLogic {
    state;
    poetry;
    constructor(poetry) {
        this.poetry = poetry;
        this.state = {
            currentTurn: "ai",
            lastLetter: "",
        };
    }
    startGame() {
        const letters = Object.keys(this.poetry);
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const verse = this.getVerseStartingWith(randomLetter);
        this.state.aiLastVerse = verse;
        this.state.lastLetter = this.getLastLetter(verse);
        this.state.currentTurn = "user";
        return verse;
    }
    processUserVerse(verse) {
        const firstLetter = this.getFirstLetter(verse).toLowerCase();
        const expected = this.state.lastLetter.toLowerCase();
        console.log(`🔍 Comparing: "${firstLetter}" vs "${expected}"`);
        if (firstLetter === expected) {
            this.state.userLastInput = verse;
            this.state.currentTurn = "ai";
            this.state.lastLetter = this.getLastLetter(verse);
            return true;
        }
        // Invalid input
        return false;
    }
    getNextAIVerse() {
        const verse = this.getVerseStartingWith(this.state.lastLetter);
        this.state.aiLastVerse = verse;
        this.state.currentTurn = "user";
        this.state.lastLetter = this.getLastLetter(verse);
        return verse;
    }
    getVerseStartingWith(letter) {
        const options = this.poetry[letter.toLowerCase()];
        if (!options || options.length === 0) {
            return "I don't have a verse for that letter.";
        }
        const verse = options[Math.floor(Math.random() * options.length)];
        return verse;
    }
    getFirstLetter(text) {
        return text.trim().replace(/[^a-zA-Z]/g, "")[0];
    }
    getLastLetter(text) {
        const cleaned = text.trim().replace(/[^a-zA-Z]+$/, "");
        return cleaned[cleaned.length - 1];
    }
    getState() {
        return this.state;
    }
}
