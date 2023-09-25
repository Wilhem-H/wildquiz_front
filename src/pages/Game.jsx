import { questions } from "../utils/quizData.js";
import "./Game.css";

export function Game() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Mélanger les questions
  shuffleArray(questions);

  // Sélectionner les 10 premières questions
  const currentQuestions = questions.slice(0, 10);

  console.log(currentQuestions);

  return (
    <div className="game">
      <div className="question"> Question ici</div>
      <div className="answers">
        <div className="answer">Réponse 1 </div>
        <div className="answer">Réponse 2</div>
        <div className="answer">Réponse 3</div>
        <div className="answer">réponse 4</div>
      </div>
    </div>
  );
}
