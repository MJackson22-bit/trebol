import { forwardRef } from 'react'

export default forwardRef((props, ref) => {
  const { data } = props

  const th = [
    'numero',
    'monto',
    'precio'
  ]

  const [infoGames] = Object
    .keys(data)
    .filter((key) => Array.isArray(data[key]))

  return (
    <div>
      <p>
        {data.Sorteo}
      </p>

      <table>
        <thead>
          <tr>
            {th.map((item, index) => (
              <th key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {infoGames.map((game, index) => (
            <tr key={index}>
              <td>{game.numero}</td>
              <td>{game.monto}</td>
              <td>{game.premio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})
