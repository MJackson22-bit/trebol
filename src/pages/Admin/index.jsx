import { useState, useEffect } from 'react'

export default function () {
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/Sale/Facturas/SalesGameFecha')
      const data = await response.json()

      setGames(data)
    }

    fetchData()
  }, [games])

  return (
    <div>
      {JSON.stringify(games)}
    </div>
  )
}
