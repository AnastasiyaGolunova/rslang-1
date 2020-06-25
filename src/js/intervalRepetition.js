export default class IntervalRepetition {
    constructor(word, quality) {
        this.word = word;
        this.quality = quality; //from 0-5
    }

    calculate(easiness, interval, repetitions) {
        const easiness;
        const interval;
        const repetitions;

        if (!word.interval) { word.interval = 0; }
        if (!word.repetitions) { word.repetitions = 0; }
        if (!word.easiness) { word.easiness = 2.5; }

        // easiness factor
        easiness = easiness + (0.1 - (5 - this.quality) * (0.08 + (5 - this.quality) * 0.02));

        // repetitions
        if (quality < 3) {
            repetitions = 0;
        } else {
            repetitions += 1;
        }

        // interval
        if (repetitions <= 1) {
            interval = 1;
        } else if (repetitions == 2) {
            interval = 6;
        } else {
            interval = Math.round(interval * easiness);
        }
    }
    // next practice 
    nextPractice() {
        const millisecondsInDay = 60 * 60 * 24 * 1000;
        const today = new Date();
        const now = today.getMilliseconds();
        const nextPracticeDate = now + millisecondsInDay * interval;
    }

    // Store the nextPracticeDate in the database
}