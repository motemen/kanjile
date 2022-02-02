import { solution } from './words'

import KANJI_TO_RADICAL from '../external/kanjivg-radical/data/kanji2radical.json'

export type CharStatus =
  | 'absent'
  | 'radical_present'
  | 'radical_correct'
  | 'present'
  | 'correct'

export type CharValue =
  | 'Q'
  | 'W'
  | 'E'
  | 'R'
  | 'T'
  | 'Y'
  | 'U'
  | 'I'
  | 'O'
  | 'P'
  | 'A'
  | 'S'
  | 'D'
  | 'F'
  | 'G'
  | 'H'
  | 'J'
  | 'K'
  | 'L'
  | 'Z'
  | 'X'
  | 'C'
  | 'V'
  | 'B'
  | 'N'
  | 'M'

// only referred by <Keybaord>, we won't need this
export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  guesses.forEach((word) => {
    word.split('').forEach((letter, i) => {
      if (!solution.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

type Radical = string
type Char = string

export const getGuessStatuses = (guess: string): CharStatus[] => {
  console.log([solution, guess])

  const solutionChars = solution.split('')
  const guessChars = guess.split('')

  const solutionRadicals = solutionChars.map(
    (ch) => [ch, ...((KANJI_TO_RADICAL as any)[ch] || [])] as Radical[]
  )

  const solutionCharToIndex: Record<Char, number[]> = {}
  solutionChars.forEach((c: Char, i: number) => {
    ;(solutionCharToIndex[c] ||= []).push(i)
  })

  const solutionRadicalToIndex: Record<Radical, number[]> = {}
  solutionRadicals.forEach((rr: Radical[], i: number) => {
    for (const r of rr) {
      ;(solutionRadicalToIndex[r] ||= []).push(i)
    }
  })

  console.log(solutionRadicalToIndex)

  const guessRadicals = guessChars.map(
    (ch) => [ch, ...((KANJI_TO_RADICAL as any)[ch] || [])] as Radical[]
  )
  guessRadicals.forEach((rr, i) => {
    for (const r of rr) {
      const ai = solutionRadicalToIndex[r]
      console.log({ radical: r, guessIndex: i, solutionIndex: ai })
    }
  })

  const result = solutionChars.map<CharStatus>(() => 'absent')

  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === solutionChars[i]) {
      result[i] = 'correct'
      continue
    }
    if (solutionCharToIndex[guessChars[i]]) {
      result[i] = 'present'
      continue
    }

    const rr = guessRadicals[i]
    for (const r of rr) {
      if (r in solutionRadicalToIndex) {
        result[i] = solutionRadicalToIndex[r].some((j) => j === i)
          ? 'radical_correct'
          : 'radical_present'
      }
    }
  }

  console.log(result)

  return result
}
