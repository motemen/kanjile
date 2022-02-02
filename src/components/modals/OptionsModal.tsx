import { BaseModal } from './BaseModal'
import { Switch } from '@headlessui/react'
import { useContext, useState } from 'react'
import { OptionsContext } from '../../lib/options'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const OptionsModal = ({ isOpen, handleClose }: Props) => {
  const { options, setOptions } = useContext(OptionsContext)
  const [useKanjiVG, setUseKanjiVG] = useState(options.useKanjiVG)

  const onChangeUseKanjiVG = (useKanjiVG: boolean) => {
    setUseKanjiVG(useKanjiVG)
    setOptions({
      ...options,
      useKanjiVG,
    })
  }

  return (
    <BaseModal title="Options" isOpen={isOpen} handleClose={handleClose}>
      <div>
        <Switch.Group>
          <Switch.Label className="mr-4 dark:text-gray-100">
            Use KanjiVG
          </Switch.Label>
          <Switch
            checked={useKanjiVG}
            onChange={onChangeUseKanjiVG}
            className={`${
              useKanjiVG
                ? 'bg-cyan-500 dark:bg-cyan-500'
                : 'bg-cyan-700 dark:bg-cyan-900'
            }
		  elative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${
                useKanjiVG ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-white rounded-full`}
            />
          </Switch>
        </Switch.Group>
      </div>
    </BaseModal>
  )
}
