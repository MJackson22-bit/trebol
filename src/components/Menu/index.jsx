import Sidebar from '~/components/Sidebar'
import MenuItemList from './MenuItemList'

export default function () {
  const menuItems = [
    { to: '/games', title: 'Juegos', className: 'text-dark' },
    { to: '/', title: 'Rifas Trebol', className: 'navbar-brand fw-bold' }
  ]

  return (
    <nav className="navbar navbar-light bg-white shadow p-3 mb-4 menu">
      <div className="container">
        <Sidebar id='offcanvasDarkNavbar' />

        <MenuItemList items={menuItems} />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  )
}
