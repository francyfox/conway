export default class Cell
{
    constructor() {
        this.LiveCount = 0;
        this.DeadCount = 0;

        this.index = null;
        this.states = [
            new DeadCell(),
            new LiveCell(),
        ];
        this.current = this.states[0]
    }

    change() {
        this.current = this.states[0]
    }

    alive() {

        this.current = this.states[1];
    }

    LiveNearby = {
        app: this,
        check (array) {
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    if (i !== 1 && j !== 1) {
                        if (array[i][j] === 1) {
                            this.app.LiveCount++;
                        } else if (array[i][j] === 0) {
                            this.app.DeadCount++;
                        }
                        this.SmallerTwoLives(array[i][j], array[1][1]);
                        this.MoreThanThreeLives(array[i][j], array[1][1]);
                        this.DeadNearby(array[i][j], array[1][1]);
                    }
                }
            }

            return this.app.current.state
        },
        SmallerTwoLives (Nearby, center) {
            if (center === 1 && this.app.LiveCount < 2) {
                this.app.change();
            }
        },
        MoreThanThreeLives (Nearby, center) {
            if (center === 1 && this.app.LiveCount > 3) {
                this.app.change();
            }
        },
        DeadNearby (Nearby, center) {
            if (center === 0 && this.app.DeadCount === 3) {
                this.app.alive();
            }
        }
    }
}

class HealthCell
{
    constructor(state) {
        this.state = state;
    }
}

class LiveCell extends HealthCell {
    constructor() {
        super(1);
    }
}

class DeadCell extends HealthCell {
    constructor() {
        super(0);
    }
}
