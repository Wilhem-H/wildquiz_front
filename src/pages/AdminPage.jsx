import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";

import { questions } from "../utils/quizData.js";
import "./AdminPage.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/player`
    )
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);

  const handleDelete = (userId) => {
    setOpen(false);
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/player/${userId}`,
      {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "user deleted") {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, "4000");
        }
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const EditMode = () => {
    setEdit((value) => !value);
  };

  return (
    <div className="admin">
      <div className="admin_users">
        <h1>Users :</h1>
        <p className={error ? "on" : "off"}>Utilisateur supprimé</p>
        {allUsers.map((user) => {
          return (
            <div className="admin_user" key={user.id}>
              {edit ? (
                <>
                  <input type="text" defaultValue={user.pseudo} />
                  <input type="text" defaultValue={user.email} />
                  <input type="text" defaultValue={user.score} />
                </>
              ) : (
                <>
                  <p>{user.pseudo}</p>
                  <p>{user.email}</p>
                  <p id="admin_user_score">{user.score}</p>
                </>
              )}

              <IconButton aria-label="Brightness3" onClick={EditMode}>
                <EditIcon />
              </IconButton>

              <IconButton aria-label="Brightness3" onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>

              <div className="popUp">
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>
                    {"Voulez-vous supprimer cet utilisateur?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {user.pseudo}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={() => handleDelete(user.id)}>
                      Valider
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
      <div className="admin_questions">
        <h1>Questions :</h1>
        {questions.map((question) => (
          <div className="admin_question" key={question.question}>
            <div className="question_question">{question.question}</div>
            <div className="question_options">
              {question.options.map((option) => (
                <p key={option}>{option}</p>
              ))}
            </div>
            <div className="question_answer">
              <u>Réponse:</u> {question.correctAnswer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
