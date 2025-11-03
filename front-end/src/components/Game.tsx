'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Board from './Board'
import GameControls from './GameControls'
import MoveHistory from './MoveHistory'
import ResultModal from './ResultModal'
import { calculateWinner, type WinnerResult } from '../lib/winner'
import { useGameSounds } from '../hooks/useGameSounds'

type BoardState = Array<'X' | 'O' | null>
type HistoryEntry = { squares: BoardState; lastMoveIndex: number | null }
type State = {
  history: Array<HistoryEntry>
  currentMove: number
  xIsNext: boolean
}

type Action =
  | { type: 'play'; index: number }
  | { type: 'jump'; move: number }
  | { type: 'reset' }

const initialBoard: BoardState = Array(9).fill(null)

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'play': {
      const currentSquares = state.history[state.currentMove].squares
      if (
        calculateWinner(currentSquares).winner ||
        currentSquares[action.index]
      )
        return state

      const nextSquares = currentSquares.slice()
      nextSquares[action.index] = state.xIsNext ? 'X' : 'O'

      const nextHistory = state.history.slice(0, state.currentMove + 1)
      nextHistory.push({ squares: nextSquares, lastMoveIndex: action.index })

      return {
        history: nextHistory,
        currentMove: nextHistory.length - 1,
        xIsNext: !state.xIsNext,
      }
    }
    case 'jump': {
      return {
        ...state,
        currentMove: action.move,
        xIsNext: action.move % 2 === 0,
      }
    }
    case 'reset':
      return {
        history: [{ squares: initialBoard, lastMoveIndex: null }],
        currentMove: 0,
        xIsNext: true,
      }
    default:
      return state
  }
}

type GameProps = {
  initialLoading?: boolean
}

export default function Game({ initialLoading = false }: GameProps) {
  const { playSound } = useGameSounds()
  const boardRef = React.useRef<HTMLDivElement>(null)

  const [state, dispatch] = React.useReducer(reducer, {
    history: [{ squares: initialBoard, lastMoveIndex: null }],
    currentMove: 0,
    xIsNext: true,
  })

  const currentSquares = state.history[state.currentMove].squares
  const result: WinnerResult = calculateWinner(currentSquares)
  const lastPlayedIndex = state.history[state.currentMove].lastMoveIndex

  // Focus game board function to be called from outside (Example: After closing WelcomeModal)
  React.useEffect(() => {
    ;(window as any).focusGameBoard = () => {
      if (boardRef.current) {
        const firstButton = boardRef.current.querySelector(
          'button',
        ) as HTMLButtonElement | null
        firstButton?.focus()
      }
    }
    return () => {
      delete (window as any).focusGameBoard
    }
  }, [])

  const status = result.winner
    ? `Winner: ${result.winner}!`
    : result.isDraw
      ? 'Draw!'
      : `Next player: ${state.xIsNext ? 'X' : 'O'}`

  const handlePlay = (index: number) => {
    const currentSquares = state.history[state.currentMove].squares
    // Only play move sound if the move is valid
    if (!calculateWinner(currentSquares).winner && !currentSquares[index]) {
      // Play move sound for current player
      playSound(state.xIsNext ? 'move-x' : 'move-o')
    }
    dispatch({ type: 'play', index })
  }

  const reset = () => {
    playSound('reset')
    dispatch({ type: 'reset' })
  }

  const closeResult = () => {
    // CloseModal by resetting game
    reset()
  }

  // Play win/draw sounds when game ends
  React.useEffect(() => {
    if (result.winner) {
      // Small delay to let the move sound finish
      setTimeout(() => playSound('win'), 200)
    } else if (result.isDraw) {
      setTimeout(() => playSound('draw'), 200)
    }
  }, [result.winner, result.isDraw, playSound])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Game layout */}
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 xl:gap-8 items-start justify-center max-w-7xl mx-auto">
          {/* Main game area */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-lg mx-auto xl:mx-0">
            <GameControls
              nextPlayer={state.xIsNext ? 'X' : 'O'}
              onReset={reset}
              gameStatus={status}
              isGameOver={!!result.winner || result.isDraw}
              loading={initialLoading}
            />

            <Board
              ref={boardRef}
              squares={currentSquares}
              onPlay={handlePlay}
              winningLine={result.line}
              nextPlayer={state.xIsNext ? 'X' : 'O'}
              disabled={!!result.winner || result.isDraw}
              loading={initialLoading}
              lastPlayedIndex={lastPlayedIndex}
              winner={result.winner}
            />
          </div>

          {/* MoveHistory sidebar */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto xl:mx-0 xl:w-80 xl:flex-shrink-0">
            <MoveHistory
              history={state.history}
              currentMove={state.currentMove}
              loading={initialLoading}
            />
          </div>
        </div>
      </motion.div>
      {/* ResultModal */}
      <ResultModal
        open={!!result.winner || result.isDraw}
        winner={result.winner}
        isDraw={result.isDraw}
        onClose={closeResult}
      />
    </>
  )
}
