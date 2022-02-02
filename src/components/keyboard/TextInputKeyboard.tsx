import classNames from 'classnames'
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef } from 'react'

type Props = {
  onText: (value: string) => void
  onEnter: () => void
}

export const TextInputKeyboard = ({ onText, onEnter }: Props) => {
  const refText = useRef<HTMLInputElement>(null)
  useEffect(() => {
    refText.current?.focus()
  })

  const classes = classNames(
    'w-60 h-14 absolute bg-transparent text-transparent focus:outline-none'
  )
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log(ev.target.value)
    onText(ev.target.value)
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    onEnter()
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={refText}
        className={classes}
        type="text"
        onChange={onChange}
        maxLength={4}
      ></input>
    </form>
  )
}
