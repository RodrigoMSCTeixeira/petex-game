import React, { useEffect, useState } from "react";
import styles from './Board.module.css'
import useCreateBoard from '../../hooks/useCreateBoard.js'

function Board() {
  const [currentBall, setCurrentBall] = useState()
  const [otherBall, setOtherBall] = useState()

  const balls = ["blue", "orange", "green", "yellow", "red", "purple"]
  const rows = 6
  const columns = 6
  const boardElements = useCreateBoard(balls, rows, columns)

  function dragStart() {
    setCurrentBall(this)
    console.log(this)
  }

  function dragOver(e) {
    e.preventDefault()
  }

  function dragEnter(e) {
    e.preventDefault()
  }

  function dragLeave() {

  }

  function dragDrop() {
    setOtherBall(this)
  }

  function dragEnd() {

  }

  return (
    <div className={styles.board}>
      {boardElements.map(item => (
        <div
          className={styles.currentBall}
          key={item.id}
          onDragStart={dragStart}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDragEnd={dragEnd}
          onDrop={dragDrop}
        >
          <div
            id={item.ball_id}
            className={`${styles.ball} ${item.ball}`}
            style={{ rotate: `${item.ball_track_rotation}deg` }}

          ></div>
          <div className={styles.ballScore}>{item.ball_score}</div>
        </div>

      ))}
    </div>
  )
}

export default Board