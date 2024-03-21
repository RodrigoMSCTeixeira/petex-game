class CheckValid {
  #rows = 0
  #colums = 0
  #balls = []

  constructor({
    rows = 0,
    colums = 0,
    balls = [] }) {
    this.#rows = rows
    this.#colums = colums
    this.#balls = balls
  }

  #checkValid() {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#colums - 2; j++) {
        const ball1 = this.#balls[i][j]
        const ball2 = this.#balls[i][j + 1]
        const ball3 = this.#balls[i][j + 2]

        if (
          ball1.ball_color === ball2.ball_color &&
          ball2.ball_color === ball3.ball_color &&
          !ball1.ball_color.includes('white')) {
          return true
        }
      }
    }

    for (let i = 0; i < this.#colums; i++) {
      for (let j = 0; j < this.#rows - 2; j++) {
        const ball1 = this.#balls[j][i]
        const ball2 = this.#balls[j + 1][i]
        const ball3 = this.#balls[j + 2][i]

        if (
          ball1.ball_color === ball2.ball_color &&
          ball2.ball_color === ball3.ball_color &&
          !ball1.ball_color.includes('white')) {
          return true
        }
      }
    }

    return false
  }

  get handleCheckValid() {
    return this.#checkValid()
  }

}

export default CheckValid