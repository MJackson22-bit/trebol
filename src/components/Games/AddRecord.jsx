import { formatRandom } from '~/utils/random'
import RecordsList from './RecordsList'
import { useGameRecord } from '~/hooks/useGameRecord'
import { useAnimation } from '~/hooks/useAnimation'
import RecordsInformation from './RecordsInformation'

export default function ({ store, format, title, multiply, hideTypeGame }) {
  const {
    record,
    records,
    editRecord,
    addRecord,
    removeRecord,
    handleRecord,
    hasRecords
  } = useGameRecord({ multiply })

  const { animation, handleAnimation } = useAnimation()

  const handleRandom = () => {
    const random = formatRandom(0, 99, format ?? 'xx')
    handleRecord('number', random)
  }

  hideTypeGame ??= false

  return <div className="row z-index">
    <div className="col-md-4 mb-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between bg-gradient bg-green">
          <h3 className="card-title fw-bold text-light">Trebol {title}</h3>

          <div>
            <button
              className="btn bg-light bg-gradient me-2"
              onClick={() => {
                addRecord()
                handleAnimation(true)
              }}
              onAnimationEnd={() => handleAnimation(false)}
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
            type="number"
            className='form-control mb-2'
            placeholder='Numero'
            value={record.number}
            onChange={({ target }) => handleRecord('number', target.value)}
          />

          <input
            type="number"
            className='form-control'
            placeholder='Cantidad'
            value={record.quantity}
            min={5}
            max={100}
            step={5}
            onChange={({ target }) => handleRecord('quantity', target.value)}
          />

          <RecordsList
            items={records}
            onClick={removeRecord}
            onChange={editRecord}
          />
        </div>
      </div>
    </div>

    <div className="col-md-8">
      {hasRecords() && <RecordsInformation
        items={records}
        store={store}
        animation={animation}
        hideTypeGame={hideTypeGame}
      />}
    </div>
  </div>
}
