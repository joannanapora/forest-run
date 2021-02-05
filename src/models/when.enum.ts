export enum When {
    ONE_TIME_EVENT,
    EVERYDAY,
    WEEKENDS,
    SATURDAYS,
    SUNDAYS,
    TWO_TIMES_A_WEEK,
    THREE_TIMES_A_WEEK,
    FOUR_TIMES_A_WEEK,
    FIVE_TIMES_A_WEEK,
};


export const mapOptionsToWhen = (when): When => {
    if (when === 'one time event') {
        return When.ONE_TIME_EVENT;
    }
    if (when === 'everyday') {
        return When.EVERYDAY;
    }
    if (when === 'weekends') {
        return When.WEEKENDS;
    }
    if (when === 'saturdays') {
        return When.SATURDAYS;
    }
    if (when === 'sundays') {
        return When.SUNDAYS;
    }
    if (when === 'two times a week') {
        return When.TWO_TIMES_A_WEEK;
    }
    if (when === 'three times a week') {
        return When.THREE_TIMES_A_WEEK;
    }
    if (when === 'four times a week') {
        return When.FOUR_TIMES_A_WEEK;
    }
    if (when === 'five times a week') {
        return When.FIVE_TIMES_A_WEEK;
    }
};



export const mapWhenToOptions = (option: number): string => {
    if (option === 0) {
        return 'one time event';
    }
    if (option === 1) {
        return 'everyday';
    }
    if (option === 2) {
        return 'weekends';
    }
    if (option === 3) {
        return 'saturdays';
    }
    if (option === 4) {
        return 'sundays';
    }
    if (option === 5) {
        return 'two times a week';
    }
    if (option === 6) {
        return "three times a week";
    }
    if (option === 7) {
        return "four times a week";
    }
    if (option === 7) {
        return "five times a week";
    }
};