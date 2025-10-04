export function indexToCoord(index: number): { row: number; col: number } {
  return { row: Math.floor(index / 3), col: index % 3 }
}
