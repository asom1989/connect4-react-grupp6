export class VictoryChecker {
  static checkWin(
    matrix: string[][],
    currentPlayer: "X" | "O",
    row: number,
    col: number
  ): boolean {
    const directions = [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: -1 },
    ];

    for (const { row: dr, col: dc } of directions) {
      let count = 1;

      for (let i = 1; i < 4; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        if (
          this.isValidPosition(matrix, r, c) &&
          matrix[r][c] === currentPlayer
        ) {
          count++;
        } else {
          break;
        }
      }

      for (let i = 1; i < 4; i++) {
        const r = row - i * dr;
        const c = col - i * dc;
        if (
          this.isValidPosition(matrix, r, c) &&
          matrix[r][c] === currentPlayer
        ) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 4) return true;
    }

    return false;
  }

  static checkDraw(matrix: string[][]): boolean {
    return matrix.every((row) => row.every((cell) => cell !== " "));
  }

  private static isValidPosition(
    matrix: string[][],
    row: number,
    col: number
  ): boolean {
    return (
      row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length
    );
  }
}
