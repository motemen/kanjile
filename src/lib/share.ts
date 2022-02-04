import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'
import { MAX_GUESSES } from '../constants/game'

export const shareStatus = (guesses: string[], lost: boolean) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${MAX_GUESSES}\n\n` +
      generateEmojiGrid(guesses) +
      '\n\nhttps://motemen.github.io/kanjile/'
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((letter, i): string => {
          const s = status[i]
          switch (s.type) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            case 'radical':
              if ((s.correct?.length ?? 0) > 0) {
                return '🟧'
              } else {
                return '🟥'
              }
            case 'absent':
              return '⬜'
            default:
              return '⬜' as never
          }
        })
        .join('')
    })
    .join('\n')
}
