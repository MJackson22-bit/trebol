export const store = async (item) => {
  item = {
    ...item,
    juego_id: 1,
    saleDataDiaria: item.data
  }

  return await fetch('http://localhost:8000/api/Sale/Diaria/Save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
}
