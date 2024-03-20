import CreateBoard from "../../services/CreateBoardService";

class CreateBoardController extends CreateBoard {
  constructor(balls = [''], rows = 0, colums = 0) {
    super({ balls, rows, colums })
  }
}

export default CreateBoardController