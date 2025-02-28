Here is the formatted version for your report:

---

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

### **Technical Overview:**
1. **Platform:** Using **Speechstate** for voice recognition and dialogue management.
2. **Programming Language:** **Python** for backend logic and NLP processing.
3. **NLP Components:**
   - **Word Segmentation & Tokenization** using **Hazm** or **Parsivar**.
   - **Text Matching & Validation** to check the authenticity of verses.
4. **Knowledge Base:**
   - A database of Persian poetry organized by last letters for efficient lookups.
5. **Game Logic:**
   - Turn management, time tracking, scorekeeping, and maintaining state transitions.
6. **Dialogue Management:**
   - Managing conversation flow and providing hints or feedback to the player.
7. **User Interface:**
   - Voice-based interaction for an immersive gaming experience.

---

### **Development Plan:**
1. **Step 1: Define the Dialogue Flow**
   - **State Machine Diagram**: Visualizing the dialogue flow and game states, including:
     - **Welcome Screen** – Introduction and explanation of rules.
     - **Game Start** – Prompting the player to recite a verse.
     - **Turn Management** – Alternating turns between the player and the system.
     - **Verse Validation** – Checking the last letter and authenticity of the verse.
     - **End Game** – Declaring the winner or ending the game if no valid verse is found.

2. **Step 2: Game Logic and NLP Components**
   - **Extract Last Letter:** Using **Hazm** or **Parsivar** for Farsi text processing.
   - **Verse Validation:** Building a comprehensive database of authentic Persian poetry.
   - **Turn Management:** Implementing a system to track turns, time limits, and scores.

3. **Step 3: Using Speechstate**
   - **Speech Recognition:** Capturing the player’s voice input.
   - **Natural Language Understanding:** Extracting and validating verses.
   - **Dialogue Management:** Managing state transitions for smooth turn-based gameplay.

4. **Step 4: Project Collaboration and Structure**
   - **Team Members:**
     - **Zohreh:** Responsible for dialogue flow, state machine design, and speech recognition integration.
     - **Bita:** Focused on NLP module development, database management, and verse validation.
   - **Version Control:** Using **GitHub** for collaboration and maintaining a project diary of tasks and contributions.

---

### **Expected Outcome:**
A functional and engaging dialogue-based game application that preserves the cultural essence of **Mosha’ereh** while leveraging modern voice technology. This game will serve as an educational and entertaining tool for Persian poetry enthusiasts.

---

### **Next Steps:**
- **Develop the State Machine Diagram** – To visualize dialogue flow and state transitions.
- **Build the NLP Module** – For text processing and verse validation.
- **Integrate Speechstate** – To enable voice-based interaction and dialogue management.
- **Test and Iterate** – Ensuring smooth gameplay and accurate poetry validation.

---

