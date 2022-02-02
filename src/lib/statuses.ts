import { solution } from './words'

import KANJI_TO_RADICAL from '../external/kanjivg-radical/data/kanji2radical.json'

export type CharStatus =
  | { type: 'absent' }
  | { type: 'radical_present'; radicals: string[] }
  | { type: 'radical_correct'; radicals: string[] }
  | { type: 'present' }
  | { type: 'correct' }

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

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  // only referred by <Keybaord>, we won't need this
  // stub
  return {}
}

type Radical = string
type Char = string

export const getGuessStatuses = (guess: string): CharStatus[] => {
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

  const guessRadicals = guessChars.map(
    (ch) => [ch, ...((KANJI_TO_RADICAL as any)[ch] || [])] as Radical[]
  )

  const result = solutionChars.map<CharStatus>(() => ({ type: 'absent' }))

  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === solutionChars[i]) {
      result[i] = { type: 'correct' }
      continue
    }
    if (solutionCharToIndex[guessChars[i]]) {
      result[i] = { type: 'present' }
      continue
    }

    const rr = guessRadicals[i]
    for (const r of rr) {
      if (r in solutionRadicalToIndex) {
        result[i] = solutionRadicalToIndex[r].some((j) => j === i)
          ? { type: 'radical_correct', radicals: [r] }
          : { type: 'radical_present', radicals: [r] }
      }
    }
  }

  return result
}
