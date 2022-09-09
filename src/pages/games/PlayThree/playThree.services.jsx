export const store = async (item) => {
  item = {
    ...item,
    juego_id: 2,
    saleDataJuega3: item.data
  }

  return await fetch('http://localhost:8000/api/Sale/Juega3/Save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
}
