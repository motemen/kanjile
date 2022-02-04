import * as React from 'react'

export interface Options {
  useKanjiVG: boolean
  __migrate_01_forceUseKanjiVG?: boolean
}

export const DEFAULT_OPTIONS: Options = {
  useKanjiVG: true,
  __migrate_01_forceUseKanjiVG: true,
}

interface OptionsContextType {
  options: Options
  setOptions: (o: Options) => void
}

export const OptionsContext = React.createContext<OptionsContextType>({
  options: DEFAULT_OPTIONS,
  setOptions: storeOptions,
})

export function loadOptions(): Options {
  try {
    const options = JSON.parse(
      localStorage.getItem('options') || ''
    ) as unknown as Options
    if (!options.__migrate_01_forceUseKanjiVG) {
      if (!options.useKanjiVG) {
        options.useKanjiVG = true
      }
      options.__migrate_01_forceUseKanjiVG = true
      storeOptions(options)
    }
    return options
  } catch (err) {
    return DEFAULT_OPTIONS
  }
}

export function storeOptions(options: Options) {
  localStorage.setItem('options', JSON.stringify(options))
}
