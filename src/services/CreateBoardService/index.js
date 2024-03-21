class CreateBoard {
  #ballColors = [""]
  #board = []
  #rows = 0
  #colums = 0
  #id = 1

  constructor({ ballColors = [''], rows = 0, colums = 0 }) {
    this.#ballColors = ballColors
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

  #getRandomBallColor() {
    return this.#ballColors[Math.floor(Math.random() * this.#ballColors.length)]
  }

  #createBoard() {
    for (let i = 0; i < this.#rows; i++) {
      let row = [];
      for (let j = 0; j < this.#colums; j++) {
        const cube = {
          id: this.#getBallId(),
          ball_color: this.#getRandomBallColor(),
          ball_id: `${i.toString()}-${j.toString()}`,
          ball_track_rotation: this.#getBallTrackRotation(),
          ball_score: this.#getBallScore()
        }
        row.push(cube)
      }
      this.#board.push(row)
    }
    return this.#board
  }

  get create() {
    return this.#createBoard()
  }

}

export default CreateBoard