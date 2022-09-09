import { useErrors } from '~/hooks/useErrors'

export default function ({ name, onChange, ...props }) {
  const { errors, handleErrors } = useErrors()

  const handleChange = (e) => {
    const { value } = e.target
    handleErrors({ [name]: null })
    onChange(name, value)
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        onChange={handleChange}
        {...props}
      />
      {errors[name] && (
        <div className="my-2">
          <p className="text-danger">
            {errors[name]}
          </p>
        </div>
      )}
    </div>
  )
}
