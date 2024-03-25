class ControlService {
  #ballColors = [""]
  #rows = 0
  #colums = 0
  #balls = []

  constructor({
    ballColors = [''],
    rows = 0,
    columns = 0,
    balls = [] }) {
    this.#ballColors = ballColors
    this.#rows = rows
    this.#colums = columns
    this.#balls = balls
  }

  #getRandomBallColor() {
    return this.#ballColors[Math.floor(Math.random() * this.#ballColors.length)]
  }

  #crushThree() {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#colums - 2; j++) {
        const ball1 = this.#balls[i][j]
        const ball2 = this.#balls[i][j + 1]
        const ball3 = this.#balls[i][j + 2]

        console.log(ball3)

        if (
          ball1.ball_color == ball2.ball_color &&
          ball2.ball_color == ball3.ball_color &&
          !ball1.ball_color.includes('white')) {
          ball1.ball_color = 'white'
          ball2.ball_color = 'white'
          ball3.ball_color = 'white'
        }
      }
    }

    for (let i = 0; i < this.#colums; i++) {
      for (let j = 0; j < this.#rows - 2; j++) {
        const ball1 = this.#balls[j][i]
        const ball2 = this.#balls[j + 1][i]
        const ball3 = this.#balls[j + 2][i]




        if (
          ball1.ball_color == ball2.ball_color &&
          ball2.ball_color == ball3.ball_color &&
          !ball1.ball_color.includes('white')) {
          ball1.ball_color = 'white'
          ball2.ball_color = 'white'
          ball3.ball_color = 'white'
        }
      }
    }
  }

  #crushBall() {
    this.#crushThree()
  }

  #slideBall() {
    for (let i = 0; i < this.#colums; i++) {
      let ind = this.#rows - 1

      for (let j = this.#colums - 1; j >= 0; j--) {
        if (!this.#balls[j][i].ball_color.includes('white')) {
          this.#balls[ind][i].ball_color = this.#balls[j][i].ball_color
          ind -= 1
        }
      }

      for (let k = ind; k >= 0; k--) {
        this.#balls[k][i].ball_color = 'white'
      }
    }
  }

  #generateBall() {
    for (let i = 0; i < this.#colums; i++) {
      if (!this.#balls[0][i].ball_color.includes('white')) {
        this.#balls[0][i].ball_color = this.#getRandomBallColor()
      }

    }
  }

  get getCrushBall() {
    this.#crushBall()
  }

  get getSlideBall() {
    this.#slideBall()
  }

  get getGenerateBall() {
    this.#generateBall()
  }
}

export default ControlService