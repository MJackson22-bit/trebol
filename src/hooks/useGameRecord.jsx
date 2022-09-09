import { useState } from 'react'
import uuid from 'react-uuid'

export const useGameRecord = ({ multiply }) => {
  const initialState = {
    id: uuid(),
    number: '',
    quantity: 5,
    prize: ''
  }

  const [records, setRecords] = useState([])
  const [record, setRecord] = useState(initialState)

  const addRecord = () => {
    setRecord(record)
    setRecords([...records, record])
    clearRecord()
  }

  const handleRecord = (key, value) => {
    setRecord((prevRecord) => {
      const initialState = {
        ...prevRecord,
        [key]: value
      }

      initialState.prize = initialState.quantity * multiply

      return initialState
    })
  }

  const removeRecord = (id) => {
    setRecords(records.filter(record => record.id !== id))
  }

  const editRecord = (id, key, data) => {
    setRecords(records.map(record => {
      if (record.id === id) {
        const initialState = {
          ...record,
          [key]: data
        }

        initialState.prize = initialState.quantity * multiply

        return initialState
      }

      return record
    }))
  }

  const clearRecord = () => {
    setRecord(initialState)
  }

  const hasRecords = () => {
    return records.length > 0
  }

  return {
    record,
    records,
    editRecord,
    addRecord,
    removeRecord,
    handleRecord,
    hasRecords
  }
}
