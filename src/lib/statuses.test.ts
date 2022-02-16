import { CharStatus, getGuessStatuses, getGuessStatusesTo } from './statuses'

describe('getGuessStatuesTo', () => {
  const match = (guess: string, solution: string, result: CharStatus[]) => {
    test(`${guess} vs ${solution}`, () => {
      expect(getGuessStatusesTo(guess, solution)).toEqual(result)
    })
  }

  match('三寒四温', '三寒四温', [
    { type: 'correct' },
    { type: 'correct' },
    { type: 'correct' },
    { type: 'correct' },
  ])

  match('三三三三', '三三五五', [
    { type: 'correct' },
    { type: 'correct' },
    { type: 'absent' },
    { type: 'absent' },
  ])

  match('三三五五', '三寒四温', [
    { type: 'correct' },
    { type: 'radical', correct: ['三'] },
    { type: 'absent' },
    { type: 'absent' },
  ])

  match('三冬XX', '三寒四温', [
    { type: 'correct' },
    { type: 'radical', correct: ['冫'] },
    { type: 'absent' },
    { type: 'absent' },
  ])

  match('冬XXX', '三寒四温', [
    { type: 'radical', present: ['冫'] },
    { type: 'absent' },
    { type: 'absent' },
    { type: 'absent' },
  ])

  match('傍若無人', '一生懸命', [
    { type: 'absent' },
    { type: 'absent' },
    { type: 'radical', present: ['一'] },
    { type: 'radical', correct: ['人'] },
  ])

  match('命令系統', '人口増加', [
    { type: 'radical', correct: ['人'], present: ['口'] },
    { type: 'absent' },
    { type: 'absent' },
    { type: 'absent' },
  ])

  match('命命命命', '人口増加', [
    { type: 'radical', correct: ['人'] },
    { type: 'radical', correct: ['口'] },
    { type: 'absent' },
    { type: 'radical', correct: ['口'] },
  ])

  match('老老介護', '老若男女', [
    { type: 'correct' },
    { type: 'absent' },
    { type: 'absent' },
    { type: 'radical', present: ['艹'] },
  ])

  match('思思思思', '老若男女', [
    { type: 'absent' },
    { type: 'absent' },
    { type: 'radical', correct: ['田'] },
    { type: 'absent' },
  ])

  match('正体不明', '日進月歩', [
    { type: 'radical', present: ['止'] },
    { type: 'absent' },
    { type: 'absent' },
    { type: 'radical', present: ['日', '月'] },
  ])
})
