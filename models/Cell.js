export default class Cell
{
    constructor() {
        this.LiveCount = 0;
        this.DeadCount = 0;

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

    alive() {
        return this.current - 1;
    }

    LiveNearby = {
        app: this,
        check (array) {
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    if (array[i][j] === 1) {
                        this.app.LiveCount++;
                    } else if (array[i][j] === 2) {
                        this.app.DeadCount++;
                    }
                    this.SmallerTwoLives(array[i][j], array[1][1]);
                    // this.TwoOrThreeLives(array[i][j], array[1][1]);
                    this.MoreThanThreeLives(array[i][j], array[1][1]);
                    this.DeadNearby(array[i][j], array[1][1]);
                }
            }
            return this.app.current.state
        },
        SmallerTwoLives (Nearby, center) {
            if (center === 1 && this.app.LiveCount < 2) {
                this.app.change();
            }
        },
        // TwoOrThreeLives (Nearby, center) {
        //     if (center === 1 && this.app.LiveCount >= 2 && this.app.LiveCount <= 3) {
        //         // Live ??
        //     }
        // },
        MoreThanThreeLives (Nearby, center) {
            if (center === 1 && this.app.LiveCount > 3) {
                this.app.change();
            }
        },
        DeadNearby (Nearby, center) {
            if (center === 2 && Nearby > 3) {
                this.app.alive();
            }
        }
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
