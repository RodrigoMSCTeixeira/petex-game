import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import ControlController from "../../controllers/ControlController";
import CheckValidController from "../../controllers/CheckValidController";
import CreateBoardController from "../../controllers/CreateBoardController";

const ballColors = ["blue", "orange", "green", "yellow", "red", "purple"];
const rows = 7;
const columns = 7;
const boardElements = new CreateBoardController(ballColors, rows, columns)
  .create;
const controls = new ControlController(
  ballColors,
  rows,
  columns,
  boardElements
);

function Board() {
  const [currentBall, setCurrentBall] = useState(null);
  const [currentBallId, setCurrentBallId] = useState(null);
  const [currentBallColor, setCurrentBallColor] = useState(null);
  const [otherBall, setOtherBall] = useState(null);
  const [otherBallId, setOtherBallId] = useState(null);
  const [otherBallColor, setOtherBallColor] = useState(null);
  const [board, setBoard] = useState(boardElements);

  useEffect(() => {
    // setInterval(function () {
    //   const crushBall = controls.getCrushBall
    //   const slideBall = controls.getSlideBall
    //   const generateBall = controls.getGenerateBall
    // }, 100)
    //const crushBall = controls.getCrushBall;
    //const slideBall = controls.getSlideBall;
    //const generateBall = controls.getGenerateBall;
  }, [currentBall, otherBall]);

  function dragStart(e, ball) {
    setCurrentBall(ball);
    setCurrentBallId(e.target.children[0].id);
    setCurrentBallColor(e.target.firstChild.classList[1]);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {}

  function dragDrop(e, ball) {
    setOtherBallId(e.target.id);
    setOtherBall(ball);
    setOtherBallColor(e.target.classList[1]);
  }

  function dragEnd() {
    if (
      currentBallColor.includes("white") ||
      otherBallColor.includes("white")
    ) {
      return;
    }

    const currentCoords = currentBallId.split("-");
    const currentBallRow = Number(currentCoords[0]);
    const currentBallColumn = Number(currentCoords[1]);

    const ohterCoords = otherBallId.split("-");
    const otherBallRow = Number(ohterCoords[0]);
    const otherBallColumn = Number(ohterCoords[1]);

    const moveLeft =
      otherBallColumn === currentBallColumn - 1 &&
      currentBallRow === otherBallRow;
    const moveRight =
      otherBallColumn === currentBallColumn + 1 &&
      currentBallRow === otherBallRow;

    const moveUp =
      otherBallRow === currentBallRow - 1 &&
      currentBallColumn === otherBallColumn;
    const moveDown =
      otherBallRow === currentBallRow + 1 &&
      currentBallColumn === otherBallColumn;

    const isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
      const newBoard = [...board];

      console.log(currentBallId, otherBallId);

      console.log(currentBall, otherBall);

      for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[i].length; j++) {
          if (newBoard[i][j].ball_id == currentBallId) {
            newBoard[i][j] = otherBall;
          }
          if (newBoard[i][j].ball_id == otherBallId) {
            newBoard[i][j] = currentBall;
          }
        }
      }

      const validMove = new CheckValidController(rows, columns, newBoard)
        .handleCheckValid;

      if (!validMove) {
        for (let i = 0; i < newBoard.length; i++) {
          for (let j = 0; j < newBoard[i].length; j++) {
            if (newBoard[i][j].ball_id == currentBallId) {
              newBoard[i][j] = otherBall;
            }
            if (newBoard[i][j].ball_id == otherBallId) {
              newBoard[i][j] = currentBall;
            }
          }
        }
      }
      setBoard(newBoard);
    }
  }

  return (
    <div className={styles.board}>
      {board.map((item) =>
        item.map((ball, i) => (
          <div
            className={styles.currentBall}
            key={i}
            draggable
            onDragStart={(e) => dragStart(e, ball)}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragEnd={dragEnd}
            onDrop={(e) => dragDrop(e, ball)}
          >
            <div
              id={ball.ball_id}
              className={`${styles.ball} ${ball.ball_color}`}
              style={{ rotate: `${ball.ball_track_rotation}deg` }}
            ></div>
          </div>
        ))
      )}
    </div>
  );
}

export default Board;
