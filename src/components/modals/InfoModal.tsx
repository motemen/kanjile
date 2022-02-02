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
        四字熟語を当てます。答えを入力するとタイルの色が変わり、文字や漢字の偏旁（パーツ）が合っているかどうかが示されます。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="傍" />
        <Cell value="若" status={{ type: 'correct' }} />
        <Cell value="無" />
        <Cell value="人" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        「若」の字は、文字も位置も合っています。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="不" />
        <Cell value="老" status={{ type: 'present' }} />
        <Cell value="不" />
        <Cell value="死" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        「老」の字は、文字は合っていますが位置が合っていません。
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
        「比」の字は、「匕」のパーツだけ合っています。このパーツはこの位置で使われています。
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
        「考」の字は、「耂」のパーツだけ合っていますが、位置が違います。
      </p>
    </BaseModal>
  )
}
