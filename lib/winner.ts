export type WinnerResult = {
  winner: 'X' | 'O' | null
  line: number[] | null
  isDraw: boolean
}

const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function calculateWinner(
  squares: Array<'X' | 'O' | null>,
): WinnerResult {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a]!, line: [a, b, c], isDraw: false }
    }
  }
  const isDraw = squares.every((v) => v !== null)
  return { winner: null, line: null, isDraw }
}
