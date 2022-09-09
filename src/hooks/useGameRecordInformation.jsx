import { useEffect, useState } from 'react'
import Card from '~/components/Card'

export const useGameRecordInformation = ({ items, store }) => {
  const getTotal = () => {
    return items.reduce((total, item) => {
      return total + parseInt(item.quantity)
    }, 0)
  }

  const [gameType, setGameType] = useState('sencilla')
  const [totalPrice, setTotalPrice] = useState(getTotal())
  const [pay, setPay] = useState(0)

  const handleChange = (value) => {
    const total = getTotal()

    setTotalPrice(
      value === 'sencilla'
        ? total
        : total * 2
    )

    setGameType(value)
  }

  const handlePay = (value) => {
    setPay(value)
  }

  const handleSubmit = async (e, componentRef) => {
    e.preventDefault()

    const item = {
      user_id: 1,
      vendedor_id: 1,
      tipo_venta_id: gameType === 'sencilla' ? 1 : 2,
      cliente: 'fer',
      data: items.map((item) => ({
        numero: item.number,
        monto: item.quantity,
        premio: item.prize
      }))
    }

    const response = await store(item)
    const data = await response.json()

    return <Card ref={componentRef} data={data} />
  }

  useEffect(() => {
    handleChange(gameType)
  })

  return {
    totalPrice,
    pay,
    handleChange,
    handlePay,
    handleSubmit,
    gameType
  }
}
