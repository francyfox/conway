export default class Cell
{
    constructor() {
        this.LiveCount = 0;
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
                        }
                        this.moreThreeAndLessTwo(array[i][j], array[1][1]);
                        this.liveNearby(array[i][j], array[1][1]);
                    }
                }
            }

            return this.app.current.state
        },
        moreThreeAndLessTwo (Nearby, center) {
            if (center == 1 && (this.app.LiveCount > 3 || this.app.LiveCount < 2)) {
                this.app.change();
            }
        },
        liveNearby (Nearby, center) {
            if (center === 0 && this.app.LiveCount == 3) {
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
