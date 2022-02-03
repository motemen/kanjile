import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This is an open source Kanji guessing game -{' '}
        <a
          href="https://github.com/motemen/kanjile"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        KanjiVG is licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          className="underline font-bold"
        >
          CC BY-SA 3.0
        </a>
        .
      </p>
    </BaseModal>
  )
}
