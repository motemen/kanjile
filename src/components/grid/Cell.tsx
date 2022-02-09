import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import useSWR from 'swr'
import { useContext } from 'react'
import { OptionsContext } from '../../lib/options'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const { options } = useContext(OptionsContext)
  const { useKanjiVG } = options

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status?.type === 'absent',
      'bg-green-500 text-white border-green-500': status?.type === 'correct',
      'bg-yellow-500 dark:bg-yellow-600 text-white border-yellow-500 dark:border-yellow-600 colorblind:border-double':
        status?.type === 'present',
      'bg-orange-500 dark:bg-orange-600 text-white border-orange-500 dark:border-orange-600 colorblind:border-dashed':
        status?.type === 'radical' && (status.correct?.length ?? 0) > 0,
      'bg-red-500 dark:bg-red-700 text-white border-red-500 dark:border-red-700 colorblind:border-dotted':
        status?.type === 'radical' &&
        (status.correct?.length ?? 0) === 0 &&
        (status.present?.length ?? 0) > 0,
      'cell-animation': !!value,
    },
    useKanjiVG && 'bg-transparent dark:bg-transparent'
  )

  const { data: docCached, error } = useSWR(
    useKanjiVG && value,
    async (char) => {
      let code = char.charCodeAt(0).toString(16).toLowerCase()
      code = '0'.repeat(5 - code.length) + code

      const resp = await fetch(`./kanjivg/kanji/${code}.svg`)
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }

      const svgXML = await resp.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(svgXML, 'image/svg+xml')

      const svg = doc.querySelector('svg')!
      svg.removeAttribute('height')
      svg.removeAttribute('width')
      svg.setAttribute('style', 'width: 100%')

      return doc
    }
  )

  const doc = docCached?.cloneNode(true) as Document | undefined

  if (error) {
    console.error(error)
  }

  if (doc && status?.type === 'radical') {
    const seen: Record<string, boolean> = {}
    ;(['correct', 'present'] as const).forEach((key) => {
      status[key]?.forEach((r) => {
        if (seen[r]) return
        seen[r] = true
        // XXX なんでかうまくいかない？
        // const el = doc.querySelectorAll(`g[kvg\\:element="${r}"]`)
        const els = doc.querySelectorAll('g')
        for (let i = 0; i < els.length; i++) {
          const el = els[i]

          if (el.getAttributeNS('http://kanjivg.tagaini.net', 'element') !== r)
            continue

          el.setAttribute(
            'class',
            classnames({
              'stroke-orange-500 dark:stroke-orange-600': key === 'correct',
              'stroke-red-500 dark:stroke-red-700': key === 'present',
            })
          )
          break
        }
      })
    })
  }

  if (doc) {
    return (
      <div
        className={classes}
        dangerouslySetInnerHTML={{
          __html: doc.querySelector('svg')!.outerHTML,
        }}
      />
    )
  }

  return <div className={classes}>{value}</div>
}
