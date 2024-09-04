import { BoardProps, Matrix } from "../types/types.js";

export default class Board {
  matrix: Matrix;
  rows: BoardProps;
  cols: BoardProps;

  constructor() {
    this.rows = BoardProps.Rows;
    this.cols = BoardProps.Cols;
    this.matrix = [...new Array(this.rows)].map((_row) => [...new Array(this.cols)].map((_column) => null));
  }

  render() {
		const line = "\n" + "-".repeat(this.cols * 4 + 1) + "\n";
		const lastLine = "\n" + "-".repeat(this.cols * 4 + 1);
    const columnNumbers = [...new Array(7)].map((_col, index) => `${index + 1}`);

    console.log(line + this.matrix.map((row) => row.map((col) => `| ${col === null ? " " : col} `).join("") + "|").join(line) + lastLine);
    console.log(columnNumbers.map((col) => `| ${col} `).join("") + "|" + "\n");
  }
}