import ControlService from "../../services/ControlService";

class ControlController extends ControlService {
  constructor(
    ballColors = [''],
    rows = 0,
    columns = 0,
    balls = [{
      id: 0,
      ball_color: '',
      ball_id: '',
      ball_track_rotation: 0,
      ball_score: ''
    }]) {
    super({
      ballColors,
      rows,
      columns,
      balls
    })
  }
}

export default ControlController