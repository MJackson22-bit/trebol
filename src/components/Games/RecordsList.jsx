export default function ({ items, onChange, onClick }) {
  return items.map((item, index) => (
    <div key={index} className="my-2 d-flex justify-content-between gap-2">
      <input
        className="form-control"
        type="text"
        value={item.number}
        onChange={({ target }) => onChange(item.id, 'number', target.value)}
      />

      <input
        className="form-control"
        type="text"
        value={item.quantity}
        onChange={({ target }) => onChange(item.id, 'quantity', target.value)}
      />

      <button
        className="btn btn-danger"
        onClick={() => onClick(item.id)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  ))
}
