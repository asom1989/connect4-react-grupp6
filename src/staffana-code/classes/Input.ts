import prompt from "../helpers/prompt.js";

export default class Input {
  static columnRegEx = /^[1-7]$/;
  static gameTypeRegEx = /^[1-3]$/;
  static difficultyLevel = /^[1-2]$/;
  static playerNameRegEx = /\w{1,15}/;
  static regExes = [this.columnRegEx, this.gameTypeRegEx, this.difficultyLevel, this.playerNameRegEx];

  static getValid(msg: string, errMsg: string, pattern: number): string {
    let validInput = null;
    do {
      try {
        const userInput = prompt(msg);
        if (!this.regExes[pattern].test(userInput)) {
          throw new Error(errMsg);
        }
        validInput = userInput;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    } while (!validInput);
    return validInput;
  }
}

