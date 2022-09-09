export const store = async (item) => {
  const { data, ...newItem } = item

  newItem.juego_id = 3
  newItem.saleDataFechas = data.map(({ numero, monto, premio }) => {
    const [dia, mes] = `${numero}`.split('-')

    return {
      dia,
      mes,
      monto,
      premio
    }
  })

  return await fetch('http://localhost:8000/api/Sale/Fechas/Save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  })
}
