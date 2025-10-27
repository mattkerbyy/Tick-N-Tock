import { useCallback, useRef } from 'react'

export type SoundType =
  | 'move-x'
  | 'move-o'
  | 'win'
  | 'draw'
  | 'reset'
  | 'theme-toggle-day'
  | 'theme-toggle-night'
  | 'welcome'

export function useGameSounds() {
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  // Web Audio API for sound generation
  const createTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      const audioContext = getAudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = type

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(
        0.1,
        audioContext.currentTime + 0.01,
      )
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration,
      )

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    },
    [getAudioContext],
  )

  // Click sound for moves
  const createClick = useCallback(
    (frequency: number) => {
      const audioContext = getAudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = 'square'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(
        0.15,
        audioContext.currentTime + 0.005,
      )
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.1,
      )

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    },
    [getAudioContext],
  )

  // Victory melody
  const createVictorySound = useCallback(() => {
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      setTimeout(() => {
        createTone(freq, 0.2, 'triangle')
      }, index * 100)
    })
  }, [createTone])

  // Draw sound (Two quick beeps)
  const createDrawSound = useCallback(() => {
    createTone(440, 0.3, 'sine') // A4 note
    setTimeout(() => createTone(440, 0.3, 'sine'), 150)
  }, [createTone])

  // Reset sound (Bell-like chord)
  const createResetSound = useCallback(() => {
    const audioContext = getAudioContext()

    const createBellTone = (
      frequency: number,
      delay: number,
      duration: number,
    ) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime + delay,
      )
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay)
      gainNode.gain.linearRampToValueAtTime(
        0.1,
        audioContext.currentTime + delay + 0.01,
      )
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + delay + duration,
      )

      oscillator.start(audioContext.currentTime + delay)
      oscillator.stop(audioContext.currentTime + delay + duration)
    }

    createBellTone(523.25, 0, 0.8) // C5
    createBellTone(659.25, 0.1, 0.7) // E5
    createBellTone(783.99, 0.2, 0.6) // G5
  }, [getAudioContext])

  // Theme toggle sounds
  const createDayThemeSound = useCallback(() => {
    // Day mode: Bright, ascending chime
    const audioContext = getAudioContext()
    const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5 - Major chord

    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        createTone(freq, 0.15, 'triangle')
      }, index * 80)
    })
  }, [createTone, getAudioContext])

  const createNightThemeSound = useCallback(() => {
    // Night mode: Deeper, descending chime
    const audioContext = getAudioContext()
    const frequencies = [523.25, 415.3, 349.23] // C5, G#4, F4 - Minor chord

    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        createTone(freq, 0.15, 'sine')
      }, index * 80)
    })
  }, [createTone, getAudioContext])

  // Welcome sound (Ascending melody)
  const createWelcomeSound = useCallback(() => {
    try {
      const audioContext = getAudioContext()

      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }

      // Ascending arpeggio: C5, E5, G5, C6, E6
      const notes = [
        { freq: 523.25, delay: 0, duration: 0.3 }, // C5
        { freq: 659.25, delay: 0.15, duration: 0.3 }, // E5
        { freq: 783.99, delay: 0.3, duration: 0.3 }, // G5
        { freq: 1046.5, delay: 0.45, duration: 0.4 }, // C6
        { freq: 1318.51, delay: 0.65, duration: 0.5 }, // E6
      ]

      notes.forEach(({ freq, delay, duration }) => {
        setTimeout(() => {
          try {
            createTone(freq, duration, 'triangle')
          } catch (err) {
            console.warn('Note play error:', err)
          }
        }, delay * 1000)
      })
    } catch (error) {
      console.warn('Welcome sound error:', error)
    }
  }, [createTone, getAudioContext])

  const playSound = useCallback(
    (soundType: SoundType) => {
      try {
        const audioContext = getAudioContext()

        if (audioContext.state === 'suspended') {
          audioContext.resume()
        }

        switch (soundType) {
          case 'move-x':
            createClick(800) // Higher pitch for X
            break
          case 'move-o':
            createClick(400) // Lower pitch for O
            break
          case 'win':
            createVictorySound()
            break
          case 'draw':
            createDrawSound()
            break
          case 'reset':
            createResetSound()
            break
          case 'theme-toggle-day':
            createDayThemeSound()
            break
          case 'theme-toggle-night':
            createNightThemeSound()
            break
          case 'welcome':
            createWelcomeSound()
            break
        }
      } catch (error) {
        // Audio errors fallback
        console.warn('Could not play sound:', error)
      }
    },
    [
      getAudioContext,
      createClick,
      createVictorySound,
      createDrawSound,
      createResetSound,
      createDayThemeSound,
      createNightThemeSound,
      createWelcomeSound,
    ],
  )

  return { playSound }
}
