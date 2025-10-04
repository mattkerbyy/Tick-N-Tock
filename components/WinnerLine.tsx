'use client'

type WinnerLineProps = {
  line: number[] | null
  winner: 'X' | 'O' | null
}

export default function WinnerLine({ line, winner }: WinnerLineProps) {
  if (!line || !winner) return null

  const getLineStyle = () => {
    const [a, b, c] = line

    // Determine line type based on positions
    if (a === 0 && b === 1 && c === 2) return { type: 'horizontal', row: 0 }
    if (a === 3 && b === 4 && c === 5) return { type: 'horizontal', row: 1 }
    if (a === 6 && b === 7 && c === 8) return { type: 'horizontal', row: 2 }

    if (a === 0 && b === 3 && c === 6) return { type: 'vertical', col: 0 }
    if (a === 1 && b === 4 && c === 7) return { type: 'vertical', col: 1 }
    if (a === 2 && b === 5 && c === 8) return { type: 'vertical', col: 2 }

    if (a === 0 && b === 4 && c === 8)
      return { type: 'diagonal', direction: 'main' }
    if (a === 2 && b === 4 && c === 6)
      return { type: 'diagonal', direction: 'anti' }

    return null
  }

  const lineStyle = getLineStyle()
  if (!lineStyle) return null

  const getPositionClasses = () => {
    switch (lineStyle.type) {
      case 'horizontal':
        return {
          container: `absolute inset-0 flex items-center justify-center`,
          line: `w-full h-1 ${lineStyle.row === 0 ? 'top-[16.66%]' : lineStyle.row === 1 ? 'top-1/2' : 'top-[83.33%]'} absolute transform -translate-y-1/2`,
        }
      case 'vertical':
        return {
          container: `absolute inset-0 flex items-center justify-center`,
          line: `h-full w-1 ${lineStyle.col === 0 ? 'left-[16.66%]' : lineStyle.col === 1 ? 'left-1/2' : 'left-[83.33%]'} absolute transform -translate-x-1/2`,
        }
      case 'diagonal':
        return {
          container: `absolute inset-0 flex items-center justify-center`,
          line: `absolute w-full h-1 transform origin-center ${
            lineStyle.direction === 'main' ? 'rotate-45' : '-rotate-45'
          }`,
        }
      default:
        return { container: '', line: '' }
    }
  }

  const { container, line: lineClasses } = getPositionClasses()
  const winnerColor =
    winner === 'X'
      ? 'bg-indigo-600 dark:bg-indigo-400'
      : 'bg-rose-600 dark:bg-rose-400'

  return null
}
