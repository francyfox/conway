import Cell from "./Cell";
export default class Board implements Cell
{
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.matrixBoard = [];
    }

    createBoard() {

        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {

            }
        }
    }
}
