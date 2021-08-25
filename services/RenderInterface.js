import MatrixAdapter from './MatrixAdapter.js'
import { createRequire } from "module";
import Cell from "../models/Cell.js";
const require = createRequire(import.meta.url);

const file = require('../config.json');
const readline = require('readline');


export default class RenderInterface
{
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const matrix = new MatrixAdapter();
        matrix.setMatrix(file.matrix.export);
        console.info(matrix.getMatrix())
        console.info("\n Result: \n");
        this.LifeCycle(matrix, 10);
        this.rl.close();
    }

    LifeCycle(matrix, count) {
        while (count !== 0) {
            let cycle = [];
            let statistics = { live: 0, dead: 0 }
            let matrixArr = matrix.getMatrix();
            for (let y = 0; y < matrixArr.length; y++) {
                cycle[y] = new Array();
                for (let x = 0; x < matrixArr[y].length; x++) {
                    let scope = matrix.addScopeMatrix(x, y, matrixArr);
                    let cell = new Cell();
                    cycle[y].push(cell.LiveNearby.check(scope));
                    if (cell.LiveNearby.check(scope) === 1) {
                        statistics.live++;
                    } else {
                        statistics.dead++;
                    }
                }
            }
            console.log(statistics);
            matrix.setMatrix(cycle);
            count--;
        }
    }
}