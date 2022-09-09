import { useState } from 'react'
import uuid from 'react-uuid'

export const useDateGame = () => {
  const initialDate = {
    id: uuid(),
    number: '',
    day: '1',
    month: 'ene',
    quantity: '5',
    prize: ''
  }

  const [dates, setDates] = useState([])
  const [date, setDate] = useState(initialDate)

  const addDate = () => {
    setDates([...dates, date])
    clearDate()
  }

  const handleDate = (key, value) => {
    setDate((prevDate) => {
      const initialState = {
        ...prevDate,
        [key]: value
      }

      initialState.prize = initialState.quantity * 210
      initialState.number = `${initialState.day}-${initialState.month}`

      return initialState
    })
  }

  const removeDate = (id) => {
    setDates(dates.filter(date => date.id !== id))
  }

  const editDate = (id, key, data) => {
    setDates(dates.map(date => {
      if (date.id === id) {
        const initialState = {
          ...date,
          [key]: data
        }

        initialState.prize = initialState.quantity * 210
        initialState.number = `${initialState.day}-${initialState.month}`

        return initialState
      }

      return date
    }))
  }

  const clearDate = () => {
    setDate(initialDate)
  }

  const hasDates = () => {
    return dates.length > 0
  }

  return {
    date,
    dates,
    editDate,
    addDate,
    removeDate,
    handleDate,
    hasDates
  }
}
