import { MAX_GUESSES } from '../../constants/game'
import { TextInputKeyboard } from '../keyboard/TextInputKeyboard'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
  onText: (value: string) => void
  onEnter: () => void
}

export const Grid = ({ guesses, currentGuess, onText, onEnter }: Props) => {
  const empties =
    guesses.length < 4 ? Array.from(Array(4 - guesses.length)) : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < MAX_GUESSES && <CurrentRow guess={currentGuess} />}
      <TextInputKeyboard
        onText={onText}
        onEnter={onEnter}
        guessIsEmpty={currentGuess === ''}
      />
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
