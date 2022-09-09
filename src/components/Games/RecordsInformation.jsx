import { useGameRecordInformation } from '~/hooks/useGameRecordInformation'
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'

export default function ({ items, store, animation, hideTypeGame }) {
  const {
    totalPrice,
    pay,
    handleChange,
    handlePay,
    handleSubmit,
    gameType
  } = useGameRecordInformation({ items, store })

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  animation ??= false

  const isValidPay = pay > 0 && pay > totalPrice
  hideTypeGame ??= false

  return (
    <div className="bg-light rounded p-4 shadow-sm z-index">
      <div className="row">
        {!hideTypeGame && (
          <select
            className="form-select position-sticky top-0"
            onLoad={() => handleChange('sencilla')}
            onChange={(e) => handleChange(e.target.value)}
            value={gameType}
          >
            <option value="sencilla">Sencilla</option>
            <option value="super-x">Super X</option>
          </select>
        )}

        <div className="col-md-8 ps-4 d-grid align-content-center">
          <h3 className={`${animation ? 'animation__game--price' : ''}`}>
            Total a pagar: C$ {totalPrice}
          </h3>

          <input
            type="number"
            placeholder='Pagar con'
            className='form-control'
            value={pay}
            onChange={({ target }) => handlePay(target.value)}
          />

          {isValidPay && (
            <div className="alert alert-success mt-4">
              Cambio {pay - totalPrice}
            </div>
          )}

          <div className="row mt-2">
            <div className="col-md-6">
              <input
                type="date"
                className='form-control'
                value={new Date().toISOString().split('T')[0]}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="sencilla">Tiempo</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="d-grid col-6 mt-3 mx-auto">
              <form onSubmit={(e) => handleSubmit(e, componentRef)}>
                <button
                  ref={componentRef}
                  className="btn btn-success fw-bold w-100"
                  type='submit'
                  onClick={handlePrint}
                >
                  Pagar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
