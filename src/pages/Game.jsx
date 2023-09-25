import { useState } from "react";
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

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
      <div className="question"> Question ici</div>
      <div className="answers">
        <div className="answer">Réponse 1 </div>
        <div className="answer">Réponse 2</div>
        <div className="answer">Réponse 3</div>
        <div className="answer">réponse 4</div>
      </div>

      {showScore ? (
        <div className="score-section">
          You scored {score} out of {selectedQuestions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/
              {selectedQuestions.length}
            </div>
            <div className="question-text">
              {selectedQuestions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {selectedQuestions[currentQuestion].options.map((answerOption) => (
              <button
                onClick={() => handleAnswerOptionClick(answerOption)}
                key={answerOption}
              >
                {answerOption}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function test() {
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];

  return <div className="app"></div>;
}
