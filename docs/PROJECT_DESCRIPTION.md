

## Project Title: Dialogue-Based Game Application – Mosha’ereh

### Team Members:

- Bita Blouki
- Zohreh Samimi

---

### Project Description:
The goal of this project is to design and implement a dialogue-based game inspired by **Mosha’ereh**, a traditional Persian poetry game. The game will be developed using **Speechstate**, leveraging voice-only interactions to enhance the player’s experience.

---

### Game Concept: Mosha’ereh
**Mosha’ereh** is a Persian poetry game where players take turns reciting verses of poetry. Each verse must begin with the last letter of the previous verse. The game continues until a player fails to provide a valid verse within the time limit. This project aims to digitize this cultural game into an engaging voice-based application.

---

### Game Rules:
1. **Turn-Based Play:** Players and the system take turns reciting verses.
2. **Letter Matching:** Each verse must start with the last letter of the previous verse.
3. **Time Limit:** A time limit is imposed for each player’s turn.
4. **No Repeats:** Repeating verses within the same game session is not allowed.
5. **Authenticity Check:** Verses must be authentic and recognized as Persian poetry.

---
Tech Stack (with SpeechState)

Core Modules in TypeScript
We'll create the following:

PoetryDataset.ts – loads and organizes verses

SpeechRecognition.ts – captures user voice input

TextToSpeech.ts – reads AI verses out loud

GameLogic.ts – handles turn logic & validation

GameStates.ts – defines Speechstate dialogue states

⚙️ Technologies
Speech Recognition:

In browser: Web Speech API (good for quick demos)

Node.js: integrate Google Cloud Speech-to-Text or Whisper (needs a wrapper)

TTS (Text-to-Speech):

In browser: SpeechSynthesis API

Node.js: gtts, say, or cloud services (like Google TTS)

Speechstate:

Use as a finite state machine (FSM) to handle transitions like:

start → userTurn → validate → aiTurn → end

Project Structure :
moshaereh-game/
├── src/
│   ├── GameStates.ts
│   ├── PoetryDataset.ts
│   ├── GameLogic.ts
│   ├── SpeechRecognition.ts
│   ├── TextToSpeech.ts
│   └── index.ts (main loop)
├── poetry.json
├── tsconfig.json
└── package.json

Game Flow in SpeechState:

const states = {
  start: {
    entry: () => {
      const verse = getRandomVerse();
      speak(verse);
      context.expectedLetter = getLastLetter(verse);
      return "userTurn";
    }
  },
  userTurn: {
    entry: async () => {
      const userInput = await listen();
      context.userVerse = userInput;
      return "validate";
    }
  },
  validate: {
    entry: () => {
      const isValid = validateUserVerse(context.userVerse, context.expectedLetter);
      if (isValid) {
        const aiVerse = getMatchingVerse(getLastLetter(context.userVerse));
        if (!aiVerse) return "userWins";
        context.aiVerse = aiVerse;
        return "aiTurn";
      } else {
        return "gameOver";
      }
    }
  },
  aiTurn: {
    entry: () => {
      speak(context.aiVerse);
      context.expectedLetter = getLastLetter(context.aiVerse);
      return "userTurn";
    }
  },
  gameOver: {
    entry: () => {
      speak("این شعر درست نبود. بازی تمام شد.");
    }
  },
  userWins: {
    entry: () => {
      speak("شما برنده شدید! دیگه شعری ندارم.");
    }
  }
}


   - **Version Control:** Using **GitHub** for collaboration and maintaining a project diary of tasks and contributions.

---
