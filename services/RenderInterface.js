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
        const cell = new Cell();
        matrix.setMatrix(file.matrix.export);
        const matrixArr = matrix.getMatrix();
        const scope = matrix.addScopeMatrix(0, 0, matrixArr);
        console.log(
            cell.LiveNearby.check(scope)
        )
        this.rl.close();

        // this.rl.question('.:: Its conway game off life \n You want use config.json? \n Press y/n \n' , (answer) => {
        //     if (answer === 'y') {
        //         console.log(`Starting from config.json`);
        //     } else {
        //         console.log(`Generate new board`);
        //     }
        //     this.rl.close();
        // });
    }
}