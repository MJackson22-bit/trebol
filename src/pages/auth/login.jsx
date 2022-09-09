import { useAuth } from '~/hooks/useAuth'

export default function () {
  const { handleChange, handleSubmit, user } = useAuth()

  return (
    <div>
      <form className='bg-light p-2 mx-auto w-50 shadow' onSubmit={handleSubmit}>
        <h2 className="text-center">Inicia sesion</h2>

        <div className="form-outline mb-2">
          <input
            type="email"
            className="form-control"
            value={user.email}
            onChange={({ target }) => handleChange('email', target.value)}
            id="email"
          />
          <label className="form-label" htmlFor="email">Email address</label>
        </div>

        <div className="form-outline mb-2">
          <input
            type="password"
            className="form-control"
            value={user.password}
            onChange={({ target }) => handleChange('password', target.value)}
            id="password"
          />
          <label className="form-label" htmlFor="password">Password</label>
        </div>

        <button
          className='btn btn-success btn-sm'
          type="submit">
            Iniciar sesion
        </button>
      </form>
    </div>
  )
}
