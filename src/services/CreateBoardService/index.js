class CreateBoard {
  #balls = [""]
  #rows = 0
  #colums = 0
  #id = 1

  constructor({ balls = [''], rows = 0, colums = 0 }) {
    this.#balls = balls
    this.#rows = rows
    this.#colums = colums
  }

  #getBallId() {
    const id = this.#id
    this.#id++
    return id
  }

  #getBallScore() {
    return Math.floor(Math.random() * 1000)
  }

  #getBallTrackRotation() {
    return Math.floor(Math.random() * 360)
  }

  #getRandomBall() {
    return this.#balls[Math.floor(Math.random() * this.#balls.length)]
  }

  #createBoard() {
    let row = [];
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#colums; j++) {
        const cube = {
          id: this.#getBallId(),
          ball: this.#getRandomBall(),
          ball_id: `${i.toString()}-${j.toString()}`,
          ball_track_rotation: this.#getBallTrackRotation(),
          ball_score: this.#getBallScore()
        }
        row.push(cube)
      }
    }

    return row
  }


  get create() {
    return this.#createBoard()
  }

}

export default CreateBoard