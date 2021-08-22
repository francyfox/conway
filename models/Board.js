import Cell from "./Cell.js";
export default class Board extends Cell
{
    constructor(M, N) {
        super();
        this.matrix = [];
    }

    createMatrixByRandom(M, N) {
        let i = 0;
        const RowArray = Array.from({length: M}, () => ++i);
        // Math.floor(Math.random() * 2)
        this.matrix = new Array(N).fill(RowArray);
    }

    setMatrix(array) {
        this.matrix = array;
    }

    getMatrix() {
        return this.matrix;
    }

}
