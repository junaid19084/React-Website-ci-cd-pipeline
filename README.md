# FlashCard Study App

A modern, interactive flashcard application built with React and Vite for studying topics like AWS, DevOps, and general knowledge.

## 🚀 Features

- **Interactive Flashcards**: Create, edit, and delete custom flashcards with flipping animations
- **Quiz Mode**: Test your knowledge with randomized quiz sessions
- **Score Tracking**: Track your progress with detailed score history and statistics
- **Local Storage**: All data is automatically saved to your browser's local storage
- **Import/Export**: Backup and restore your flashcards as JSON files
- **Categories**: Organize flashcards by topic (AWS, DevOps, General Knowledge)
- **Difficulty Levels**: Set difficulty levels (Easy, Medium, Hard) for each card
- **Tags**: Add custom tags to organize and categorize your cards
- **Responsive Design**: Works great on desktop, tablet, and mobile devices

## 🛠️ Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`

## 📚 Usage

### Creating Flashcards
1. Click the "Add Card" button in the navigation
2. Fill in the question, answer, category, and difficulty
3. Optionally add tags for better organization
4. Click "Create Flashcard" to save

### Studying
- Click on any flashcard to flip it and reveal the answer
- Use the category filter to focus on specific topics
- Edit or delete cards using the action buttons

### Taking Quizzes
1. Select a category or use "All Categories"
2. Click "Start Quiz" to begin
3. Read each question and flip the card to see the answer
4. Mark yourself as correct or incorrect
5. View your results at the end

### Viewing Progress
- Click "Scores" in the navigation to see your quiz history
- View statistics like average score, best score, and total quizzes taken
- Track your improvement over time

### Import/Export
- **Export**: Click "Export" to download your flashcards as a JSON file
- **Import**: Click "Import" to upload a previously exported JSON file

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Flashcard.jsx    # Individual flashcard component
│   ├── FlashcardForm.jsx # Form for creating/editing cards
│   ├── Quiz.jsx         # Quiz mode component
│   └── ScoreBoard.jsx   # Score history and statistics
├── hooks/               # Custom React hooks
│   └── useFlashcards.js # Main state management hook
├── utils/               # Utility functions
│   └── storage.js       # Local storage operations
├── data/                # Sample data and constants
│   └── sampleData.js    # Pre-loaded flashcards
└── styles/              # CSS files for components
```

## 🎯 Sample Categories

The app comes pre-loaded with flashcards in three categories:

- **AWS**: Amazon Web Services concepts and services
- **DevOps**: Development operations practices and tools
- **General Knowledge**: Programming and technology concepts

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Built With

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Lucide React](https://lucide.dev/) - Icon library
- CSS3 with modern features like CSS Grid and Flexbox

## 💾 Data Storage

All flashcards and quiz scores are automatically saved to your browser's local storage. This means:
- Your data persists between sessions
- No internet connection required
- Data is private to your browser
- Use export/import to backup or transfer data

## 🎨 Features in Detail

### Flashcard System
- **Flipping Animation**: Smooth 3D flip animation reveals answers
- **Color-coded Difficulty**: Visual indicators for Easy (green), Medium (yellow), Hard (red)
- **Rich Metadata**: Categories, tags, and creation timestamps

### Quiz Mode
- **Randomized Questions**: Cards are shuffled for each quiz session
- **Self-Assessment**: You determine if your answer was correct
- **Progress Tracking**: Visual progress bar and question counter
- **Detailed Results**: Score percentage, time taken, and category

### Score Management
- **Historical Data**: Keep track of all past quiz attempts
- **Statistics**: Average score, best score, total quizzes
- **Visual Progress**: Color-coded scores and progress indicators

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 Future Enhancements

- Cloud synchronization
- Spaced repetition algorithm
- Collaborative study sessions
- Advanced analytics and insights
- Voice recording for pronunciation
- Image support in flashcards
- Study streaks and achievements+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
