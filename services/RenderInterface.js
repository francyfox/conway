import MatrixAdapter from './MatrixAdapter.js'
import { createRequire } from "module";
import Cell from "../models/Cell.js";
const require = createRequire(import.meta.url);

const file = require('../config.json');
const readline = require('readline');


export default class RenderInterface
{
    constructor() {
        this.count = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const matrix = new MatrixAdapter();
        this.rl.question('Use config.json say yes(y), random say no(n): ', (answer) => {
            if (answer === 'n') {
                let user = { N: 0, M: 0 }
                this.rl.question('Set number of columns N:  ', (N) => {
                    user.N = N
                    this.rl.question('Set number of rows M: ', (M) => {
                        user.M = M
                        matrix.addMatrixByRandom(user.M, user.N)
                        console.info(matrix.getMatrix());
                        console.info("\n Result: \n");
                        this.lifeCycle(matrix, 10)
                        this.rl.close();
                    })
                })
            } else {
                matrix.setMatrix(file.matrix.export);
                console.info(matrix.getMatrix());
                console.info("\n Result: \n");
                this.lifeCycle(matrix, 10)
                this.rl.close();
            }
        });
    }

    lifeCycle(matrix, count) {
        const Countdown = setInterval(function(){
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
            console.clear();
            console.log(cycle);
            console.log(statistics);
            matrix.setMatrix(cycle);
            count--
            if (count === 0 || statistics.live === 0) {
                clearInterval(Countdown);
            }
        }, 1000);
    }
}