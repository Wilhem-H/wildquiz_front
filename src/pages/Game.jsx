import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { questions } from "../utils/quizData.js";
import "./Game.css";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(questions);

const selectedQuestions = questions.slice(0, 10);

export function Game() {
  const { user, setUser } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [bestPlayer, setBestPlayer] = useState({});

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/player`
    )
      .then((response) => response.json())
      .then((data) => {
        setBestPlayer(data);
      });
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (selectedQuestions[currentQuestion].correctAnswer === isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < selectedQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="game">
      {showScore ? (
        <div className="game_score">
          <h1>Résultat :</h1>
          <p>
            {score} / {selectedQuestions.length}
          </p>
          <h3>Meilleurs scores:</h3>
          {console.log(bestPlayer)}
          {bestPlayer.map((player) => {
            <div key={player.id}>
              <p>{player.pseudo}</p>
              <p>{player.score}</p>
            </div>;
          })}
        </div>
      ) : (
        <div className="game_play">
          <div className="game_section1">
            <div className="game_count">
              <span>Question {currentQuestion + 1}</span>/
              {selectedQuestions.length}
            </div>
            <div className="game_question">
              {selectedQuestions[currentQuestion].question}
            </div>
          </div>
          <div className="game_answers">
            {selectedQuestions[currentQuestion].options.map((answerOption) => (
              <button
                onClick={() => handleAnswerOptionClick(answerOption)}
                key={answerOption}
                className="game_answer"
              >
                {answerOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
