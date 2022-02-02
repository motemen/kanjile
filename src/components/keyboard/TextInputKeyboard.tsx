import classNames from 'classnames'
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react'

type Props = {
  onText: (value: string) => void
  onEnter: () => void
  guessIsEmpty: boolean
}

export const TextInputKeyboard = ({ onText, onEnter, guessIsEmpty }: Props) => {
  const refText = useRef<HTMLInputElement>(null)

  useEffect(() => {
    refText.current?.focus()
    window.addEventListener('click', () => {
      refText.current?.focus()
    })
  })

  // こんなんでいいの？
  useEffect(() => {
    if (guessIsEmpty && refText.current?.value.length !== 0) {
      refText.current!.value = ''
    }
  }, [guessIsEmpty])

  const classes = classNames(
    'w-60 h-14 absolute bg-transparent dark:text-white focus:outline-none'
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
      <div className="flex justify-center mb-1">
        <input
          ref={refText}
          className={classes}
          type="text"
          onChange={onChange}
          maxLength={4}
        ></input>
      </div>
    </form>
  )
}
