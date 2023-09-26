import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { questions } from "../utils/quizData.js";
import Button from "@mui/material/Button";
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

  const [timer, setTimer] = useState(10);
  useEffect(() => {
    let intervalId;

    if (!showScore && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !showScore) {
      // Si le timer atteint 0 et que le jeu est en cours, passez à la question suivante
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < selectedQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setTimer(10); // Réinitialisez le timer pour la nouvelle question
      } else {
        setShowScore(true);
        updateUser();
      }
    }

    // Nettoyage de l'intervalle lorsque le composant est démonté ou lorsque le jeu se termine
    return () => {
      clearInterval(intervalId);
    };
  }, [currentQuestion, showScore, timer]);
  const resetTimer = () => {
    setTimer(10);
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/player`
    )
      .then((response) => response.json())
      .then((data) => {
        setBestPlayer(data);
      });
  }, []);

  const updateUser = () => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/player/${
        user.id
      }`,
      {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      }
    );
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (selectedQuestions[currentQuestion].correctAnswer === isCorrect) {
      setScore(score + 1);
      setUser((prevUser) => ({
        ...prevUser,
        score: prevUser.score + 1,
      }));
    } else {
      if (user.score > 0) {
        setUser((prevUser) => ({
          ...prevUser,
          score: prevUser.score - 1,
        }));
      }
      if (score > 0) {
        setScore(score - 1);
      }
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < selectedQuestions.length) {
      setCurrentQuestion(nextQuestion);
      resetTimer();
    } else {
      setShowScore(true);
      updateUser();
    }
  };

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className="game">
      {showScore ? (
        <div className="game_score">
          <h1>Résultat :</h1>
          <p className="game_myscore">
            {score} / {selectedQuestions.length}
          </p>
          <Button
            variant="contained"
            onClick={handleClick}
            style={{
              backgroundColor: "#0b2c2d",
            }}
          >
            Refaire une partie
          </Button>
          <h3>Meilleurs scores:</h3>
          <div className="game_ranking">
            {bestPlayer
              .slice()
              .sort((a, b) => b.score - a.score)
              .map((player) => {
                return (
                  <div key={player.id} className="game_ranking_info">
                    <p>{player.pseudo}</p>
                    <p>{player.score}</p>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="game_play">
          <div className="game_section1">
            <div className="game_count">
              <div>
                <span>Question {currentQuestion + 1}</span>/
                {selectedQuestions.length}
              </div>

              <div className="timer">Temps restant : {timer} s</div>
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
