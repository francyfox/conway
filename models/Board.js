import Cell from "./Cell.js";
export default class Board extends Cell
{
    constructor(M, N) {
        super();
        this.matrix = [];
    }

    addMatrixByRandom(M, N) {
        let i = 0;
        const RowArray = Array.from({length: M}, () => ++i);
        // Math.floor(Math.random() * 2)
        this.matrix = new Array(N).fill(RowArray);
    }

    Range (value, End) {
        if (value < 0) {
            return End;
        } else if (value > End) {
            return 0;
        } else {
            return value;
        }
    }

    addScopeMatrix (x, y, array) {
        const maxRowLength = array[0].length - 1;
        const maxColumnLength = array.length - 1;

        return [
            // top
            [
                array[this.Range(y + 1, maxColumnLength)][this.Range(x - 1, maxRowLength)],
                array[this.Range(y + 1, maxColumnLength)][this.Range(x, maxRowLength)],
                array[this.Range(y + 1, maxColumnLength)][this.Range(x + 1, maxRowLength)]
            ],
            // middle
            [
                array[this.Range(y, maxColumnLength)][this.Range(x - 1, maxRowLength)],
                array[y][x],
                array[this.Range(y, maxColumnLength)][this.Range(x + 1, maxRowLength)]
            ],
            // bottom
            [
                array[this.Range(y - 1, maxColumnLength)][this.Range(x - 1, maxRowLength)],
                array[this.Range(y - 1, maxColumnLength)][this.Range(x, maxRowLength)],
                array[this.Range(y - 1, maxColumnLength)][this.Range(x + 1, maxRowLength)]
            ]
        ]
    }

    setMatrix(array) {
        this.matrix = array;
    }

    getMatrix() {
        return this.matrix;
    }

}
