# DS_Final_Project
# Mosha’ereh Dialogue-Based Game 🎮🎤

## Overview
The **Mosha’ereh Dialogue-Based Game** is an interactive voice-only application inspired by the traditional Persian poetry game, **Mosha’ereh**. It uses **Speechstate** for voice recognition and dialogue management, allowing players to engage in poetic battles using authentic Persian poetry.

## Game Concept
**Mosha’ereh** is a turn-based Persian poetry game where players recite verses starting with the last letter of the previous verse. The game continues until a player fails to provide a valid verse within the time limit. So the game can be continued. 

## Features
- **Voice Recognition:** Powered by **Speechstate** for an immersive voice-based experience.
- **Turn-Based Gameplay:** Alternate turns between the player and the system.
- **Authenticity Check:** Validates verses using a database of authentic Persian poetry.
- **No Repeats:** Ensures that no verse is repeated within the same game session.
- **Time Limit:** Keeps the gameplay dynamic with timed turns.

## Technology Stack
- **TypeScript** - For maintainable and scalable code.
- **Speechstate** - For dialogue management and voice recognition.
- **Node.js** - Runtime for executing the game logic.
- **Hazm** or **Parsivar** - Farsi text processing and tokenization.
- **SQLite** - Database for storing and retrieving Persian poetry.

## Installation (TypeScript Version)
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/ZohrehSamimi/DS_Final_Project.git
    cd DS_Final_Project
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Compile TypeScript to JavaScript:**
    ```bash
    npx tsc
    ```

4. **Run the Game:**
    ```bash
    node dist/index.js
    ```

## How to Play
1. Start the game and listen to the system recite the first verse.
2. Recite a verse that starts with the last letter of the system's verse.
3. The system will verify the authenticity and continue the game.
4. Turns alternate until a player fails to recite a valid verse or time runs out.

## Project Structure
```plaintext
├── src/
│   ├── index.ts                  # Main entry point
│   ├── gameLogic.ts               # Game logic and rules
│   ├── speechManager.ts           # Speechstate integration
│   ├── poetryValidator.ts         # NLP module for verse validation
│   └── data/
│       └── poems.db               # Database of Persian poetry
├── dist/                          # Compiled JavaScript files
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation

```

## Team Members
```
```
Zohreh – Responsible for dialogue flow, state machine design, and speech recognition integration.
Bita – Focused on NLP module development, database management, and verse validation.

## Contribution
If you wish to contribute to this project, please follow these steps:
Fork the repository.
Create a new feature branch:
 ```bash
git checkout -b feature-name
```
Commit your changes:
 ```bash
git commit -m 'Add new feature'
```
Push to the branch:
 ```bash
git push origin feature-name
```
Open a Pull Request – Describe your changes and request a review.
License 📜
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you see fit.

Acknowledgements 🙏
Inspired by the traditional Persian poetry game Mosha’ereh.
Special thanks to the creators of Speechstate for providing a powerful dialogue management framework.
Contact 📧
For any questions or feedback, please reach out to:

Zohreh – z.samimi1981@gmail.com
Bita – bitabki@gmail.com 



**************
        Edge Case	                                                          Fix
🔇 User says nothing / silence	                            Detect empty result and ask to repeat
🔡 User input doesn't start with expected letter	        Already handled, just show better feedback
🔤 AI has no verse starting with the expected letter	    Show “You win!” and end game
🔁 Same verse repeats	                                    Avoid repeats by removing used verses
📄 poetry.json is missing letters                    	    Show friendly message: “No verses for this letter”
🔠 Punctuation or casing mismatch	                        Already handled with toLowerCase() and cleanup regexes
