import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        漢字ル by{' '}
        <a className="underline font-bold" href="https://twitter.com/motemen">
          @motemen
        </a>
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
