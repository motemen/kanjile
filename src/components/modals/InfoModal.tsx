import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the word in 6 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the word.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="傍" />
        <Cell value="若" status={{ type: 'correct' }} />
        <Cell value="無" />
        <Cell value="人" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter W is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="不" />
        <Cell value="老" status={{ type: 'present' }} />
        <Cell value="不" />
        <Cell value="死" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter L is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          value="比"
          status={{ type: 'radical_correct', radicals: ['匕'] }}
        />
        <Cell value="翼" />
        <Cell value="連" />
        <Cell value="理" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter U is not in the word in any spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="沈" />
        <Cell value="思" />
        <Cell value="黙" />
        <Cell
          value="考"
          status={{ type: 'radical_present', radicals: ['耂'] }}
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter U is not in the word in any spot.
      </p>
    </BaseModal>
  )
}
