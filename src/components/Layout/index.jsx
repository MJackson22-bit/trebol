import Menu from '~/components/Menu'
import { Outlet } from 'react-router-dom'

export default function Layout () {
  return (
    <>
      <Menu />

      <div className="container">
        <Outlet />
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  )
}
