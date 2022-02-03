import * as React from 'react'

export interface Options {
  useKanjiVG: boolean
}

export const DEFAULT_OPTIONS: Options = {
  useKanjiVG: true,
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
    return JSON.parse(localStorage.getItem('options') || '')
  } catch (err) {
    return DEFAULT_OPTIONS
  }
}

export function storeOptions(options: Options) {
  localStorage.setItem('options', JSON.stringify(options))
}
