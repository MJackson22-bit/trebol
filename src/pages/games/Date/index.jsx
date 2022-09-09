import { formatRandom } from '~/utils/random'
import RecordsList from '~/components/Games/RecordsList'
import RecordsInformation from '~/components/Games/RecordsInformation'
import { store } from './date.services'
import { useDateGame } from './useDateGame'

export default function () {
  const {
    date,
    dates,
    editDate,
    addDate,
    removeDate,
    handleDate,
    hasDates
  } = useDateGame()

  const handleRandom = () => {
    const random = formatRandom(1, 31, 'x')
    handleDate('day', random)

    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    const randomMonthIndex = Math.floor(Math.random() * months.length)
    handleDate('month', months[randomMonthIndex])
  }

  const handleQuantity = (value) => {
    if (value % 5 !== 0) {
      return
    }

    handleDate('quantity', value)
  }

  return <div className="row z-index">
    <div className="col-md-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between bg-gradient bg-green">
          <h3 className="card-title fw-bold text-light">Trebol Fecha</h3>

          <div>
            <button
              className="btn bg-light bg-gradient me-2"
              onClick={addDate}
            >
              <i className="bi bi-plus"></i>
            </button>

            <button
              className="btn bg-light bg-gradient"
              onClick={handleRandom}
            >
              <i className="bi bi-shuffle"></i>
            </button>
          </div>
        </div>

        <div className="card-body table__overflow">
          <input
            type="text"
            className='form-control mb-2'
            placeholder='Dia'
            min='1'
            max='31'
            value={date.day}
            onChange={({ target }) => handleDate('day', target.value)}
          />

          <select
            className='form-control mb-2'
            value={date.month}
            onChange={({ target }) => handleDate('month', target.value)}
          >
            <option value='Ene'>Enero</option>
            <option value='Feb'>Febrero</option>
            <option value='Mar'>Marzo</option>
            <option value='Abr'>Abril</option>
            <option value='May'>Mayo</option>
            <option value='Jun'>Junio</option>
            <option value='Jul'>Julio</option>
            <option value='Ago'>Agosto</option>
            <option value='Sep'>Septiembre</option>
            <option value='Oct'>Octubre</option>
            <option value='Nov'>Noviembre</option>
            <option value='Dic'>Diciembre</option>
          </select>

          <input
            type="number"
            className='form-control'
            placeholder='Cantidad'
            value={date.quantity}
            min={5}
            max={100}
            step={5}
            onChange={({ target }) => handleQuantity(target.value)}
          />

          <RecordsList
            items={dates}
            onClick={removeDate}
            onChange={editDate}
          />
        </div>
      </div>
    </div>

    <div className="col-md-8">
      {hasDates() && <RecordsInformation
        items={dates}
        store={store}
        hideTypeGame
      />}
    </div>
  </div>
}
