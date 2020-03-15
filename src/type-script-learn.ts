type SpellingTypeEvents =
    "onError" |
    "onErrorCountChange" |
    "onSuccess" |
    "onComplete"

class SpellingExercise {

    private exerciseParts: string[];
    private typingAt: number;

    private onError: () => void;

    private onErrorCountChange: () => void;

    private onSuccess: () => void;

    private onComplete: () => void;

    /**
     * Private constructor that 
     * starts the exercise and inits variables
     * @param exerciseParts the parts of the exercise
     */
    private constructor(exerciseParts: string[]) {
        this.exerciseParts = exerciseParts;
        this.cleanParts();
        this.typingAt = 0;
    }

    /**
     * Add an callback to a predefined event listener
     * thats allowed in instance of class
     * @param type predefined type of event
     * @param cb call back to execute on event, will overwrite older calllbacks
     */
    public addEventListener(type: SpellingTypeEvents, cb: () => void) {
        this[type] = cb;
    }

    /**
     * implements the advance functionality
     * when a user should advance +1
     */
    private advance() {
        this.typingAt += 1;
        this.doCallBack("onSuccess");
        // this.validateCompleted();
    }

    /**
     * Accepts the single most recent character
     * at user input and proceeds accordingly
     * @param input single character from user
     */
    public type(input: string) {
        if (input === this.getNextChar()) this.advance();
        else this.doCallBack("onError");
    }

    /**
     * Does callback if requested by
     * internal method. Does nothign
     * if user has not supplied callback
     * @param cb 
     */
    private doCallBack(cb: SpellingTypeEvents) {
        if (this[cb]) this[cb]();
    }

    /**
     * Returns the character that user
     * SHOULD return next
     */
    private getNextChar(): string {
        return this.getText().charAt(this.typingAt);
    }

    /**
     * Joins exercise parts to a single 
     * erxercise string
     */
    private getText() {
        return this.exerciseParts.join(" ");
    }

    /**
     * Cleans the text parts on input by
     * trimming them
     */
    private cleanParts() {
        this.exerciseParts = this.exerciseParts.map((text) => text.trim());
    }

    /**
     * public static method to create a new
     * exercise by supplying array of strings.
     * The function then returns an SpellingExercise 
     * instance
     * @param exerciseParts array of exercise parts
     */
    public static startExercise(exerciseParts: string[]) {
        return new SpellingExercise(exerciseParts);
    }
}

