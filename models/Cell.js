export default class Cell
{
    constructor() {
        this.index = null;
        this.states = [
            new NeutralCell(),
            new LiveCell(),
            new DeadCell(),
        ];
        this.current = this.states[0]
    }

    change() {
        const totalStates = this.states.length;
        let currentIndex = this.states.findIndex(state => state === this.current);
        if (currentIndex + 1 < totalStates) this.current = this.states[currentIndex + 1];
        else this.current = this.states[0];
    }

    createConvolution (x, y, array) {
        const maxRowLength = array[0].length;
        const maxColumnLength = array.length;

        const crop = array.slice(x, x + y);
        console.log(crop);
        const top = crop[0].slice(x - 1, x + 2)
        const middle = crop[1].slice(x - 1, x + 2)
        const bottom = crop[2].slice(x - 1, x + 2)

        return [
            top,
            middle,
            bottom
        ]
    }

    LiveNearby = {
        SmallerTwoLives () {

        },
        TwoOrThreeLives () {

        },
        MoreThanThreeLives () {

        }
    }

    DeadNearby () {

    }

    setIndex(index) {
        this.index = index;
    }

    getIndex() {
        return this.index
    }

    getCurrent() {
        return this.current;
    }
}

class HealthCell
{
    constructor(state) {
        this.state = state;
    }
}

class NeutralCell extends HealthCell {
    constructor() {
        super(0);
    }
}

class LiveCell extends HealthCell {
    constructor() {
        super(1);
    }
}

class DeadCell extends HealthCell {
    constructor() {
        super(2);
    }
}
