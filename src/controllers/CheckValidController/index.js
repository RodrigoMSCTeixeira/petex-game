import CheckValid from "../../services/CheckValidService";


class CheckValidController extends CheckValid {
  constructor(
    rows = 0,
    colums = 0,
    balls = [{
      id: 0,
      ball_color: '',
      ball_id: '',
      ball_track_rotation: 0,
      ball_score: ''
    }]) {
    super({ rows, colums, balls })
  }
}

export default CheckValidController