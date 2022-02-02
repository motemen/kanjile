import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'bg-green-500 text-white border-green-500': status === 'correct',
      'bg-yellow-500 dark:bg-yellow-600 text-white border-yellow-500 dark:border-yellow-600':
        status === 'present',
      'bg-orange-500 dark:bg-orange-600 text-white border-orange-500 dark:border-orange-600':
        status === 'radical_correct',
      'bg-red-500 dark:bg-red-700 text-white border-red-500 dark:border-red-700':
        status === 'radical_present',
      // TODO: radical_present, radial_correct
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>{value}</div>
}
