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
