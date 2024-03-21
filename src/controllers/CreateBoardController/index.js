import CreateBoard from "../../services/CreateBoardService";

class CreateBoardController extends CreateBoard {
  constructor(ballColors = [''], rows = 0, colums = 0) {
    super({ ballColors, rows, colums })
  }
}

export default CreateBoardController