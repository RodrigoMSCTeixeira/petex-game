import React, { useEffect, useState } from "react";
import styles from './Board.module.css';
import ControlController from "../../controllers/ControlController";
import CheckValidController from "../../controllers/CheckValidController";
import CreateBoardController from "../../controllers/CreateBoardController";

const ballColors = ["blue", "orange", "green", "yellow", "red", "purple"]
const rows = 6
const columns = 6
const boardElements = new CreateBoardController(ballColors, rows, columns).create
const controls = new ControlController(ballColors, rows, columns, boardElements)

function Board() {
  const [currentBall, setCurrentBall] = useState(null)
  const [otherBall, setOtherBall] = useState(null)

  useEffect(() => {
    setInterval(function () {
      const crushBall = controls.getCrushBall
      const generateBall = controls.getGenerateBall
      const slideBall = controls.getSlideBall
    }, 100)

  }, [])

  function dragStart(e) {
    setCurrentBall(e.target.id)
  }

  function dragOver(e) {
    e.preventDefault()
  }

  function dragEnter(e) {
    e.preventDefault()
  }

  function dragLeave() {
  }

  function dragDrop(e) {
    setOtherBall(e.target.id)
  }


  function dragEnd() {
    const currentCoords = currentBall.split('-')
    const currentBallRow = Number(currentCoords[0])
    const currentBallColumn = Number(currentCoords[1])

    const ohterCoords = otherBall.split('-')
    const otherBallRow = Number(ohterCoords[0])
    const otherBallColumn = Number(ohterCoords[1])

    console.log(currentCoords, ohterCoords)

    const moveLeft = otherBallColumn === currentBallColumn - 1 && currentBallRow === otherBallRow
    const moveRight = otherBallColumn === currentBallColumn + 1 && currentBallRow === otherBallRow

    const moveUp = otherBallRow === currentBallRow - 1 && currentBallColumn === otherBallColumn
    const moveDown = otherBallRow === currentBallRow + 1 && currentBallColumn === otherBallColumn

    const isAdjacent = moveLeft || moveRight || moveUp || moveDown

    if (isAdjacent) {
      const validMove = new CheckValidController(rows, columns, boardElements).handleCheckValid
      setCurrentBall(otherBall)
      setOtherBall(currentBall)

      if (!validMove) {
        setCurrentBall(otherBall)
        setOtherBall(currentBall)
      }
    }

  }

  return (
    <div className={styles.board}>
      {boardElements.map(item => (
        item.map(ball => (
          <div
            className={styles.currentBall}
            key={ball.id}
            draggable
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragEnd={dragEnd}
            onDrop={dragDrop}
          >
            <div
              id={ball.ball_id}
              className={`${styles.ball} ${ball.ball_color}`}
              style={{ rotate: `${ball.ball_track_rotation}deg` }}
            ></div>
          </div>

        ))
      ))}
    </div>
  )
}

export default Board