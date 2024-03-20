import CreateBoardController from "../controllers/CreateBoardController";

function useCreateBoard(balls = [''], rows = 0, colums = 0) {
  const createBoard = new CreateBoardController(balls, rows, colums).create
  return createBoard
}

export default useCreateBoard