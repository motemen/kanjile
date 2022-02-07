import { solution } from './words'

import KANJI_TO_RADICAL from '../external/kanjivg-radical/data/kanji2radical.json'

export type CharStatus =
  | { type: 'absent' }
  | { type: 'radical'; correct?: Radical[]; present?: Radical[] }
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

export const getGuessStatuses = (guess: string): CharStatus[] => {
  return getGuessStatusesTo(guess, solution)
}

export const getGuessStatusesTo = (
  guess: string,
  solution: string
): CharStatus[] => {
  type SolutionItem = {
    char: string
    radicals: (string | null)[]
  } | null
  const solutionItems: SolutionItem[] = solution.split('').flatMap((ch) => {
    return {
      char: ch,
      radicals: [
        ch,
        ...(KANJI_TO_RADICAL[ch as keyof typeof KANJI_TO_RADICAL] || []),
      ],
    }
  })

  const guessChars = guess.split('')

  const result = solution.split('').map<CharStatus | null>(() => null)

  // Find correct char
  guessChars.forEach((ch, i) => {
    if (ch === solutionItems[i]?.char) {
      result[i] = { type: 'correct' }
      solutionItems[i] = null
    }
  })

  // Find present char
  guessChars.forEach((ch, i) => {
    if (result[i]) return

    for (let j = 0; j < solutionItems.length; j++) {
      if (ch === solutionItems[j]?.char) {
        solutionItems[j] = null
        result[i] = { type: 'present' }
        break
      }
    }
  })

  // Find correct radical
  guessChars.forEach((ch, i) => {
    if (result[i]) return
    if (!solutionItems[i]) return
    ;[
      ch,
      ...(KANJI_TO_RADICAL[ch as keyof typeof KANJI_TO_RADICAL] || []),
    ].forEach((r) => {
      const j = solutionItems[i]!.radicals.indexOf(r)
      if (j !== -1) {
        solutionItems[i]!.radicals[j] = null
        if (!result[i]) {
          result[i] = {
            type: 'radical',
          }
        }
        if (result[i]?.type === 'radical') {
          ;((result[i] as any).correct ||= []).push(r)
        }
      }
    })
  })

  // Find present radical
  guessChars.forEach((ch, i) => {
    ;[
      ch,
      ...(KANJI_TO_RADICAL[ch as keyof typeof KANJI_TO_RADICAL] || []),
    ].forEach((r) => {
      for (let j = 0; j < solutionItems.length; j++) {
        if (!solutionItems[j]) continue
        const k = solutionItems[j]?.radicals.indexOf(r) || -1
        if (k !== -1) {
          solutionItems[j]!.radicals[k] = null
          if (!result[i]) {
            result[i] = {
              type: 'radical',
            }
          }
          if (result[i]?.type === 'radical') {
            ;((result[i] as any).present ||= []).push(r)
          }
        }
      }
    })
  })

  return result.map((r) => r || { type: 'absent' })
}
