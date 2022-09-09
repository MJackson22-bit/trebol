import MenuItemList from '~/components/Menu/MenuItemList'

export default function ({ id }) {
  const sideBarItems = [
    { to: '/', title: 'Inicio' },
    { type: 'divider' },
    {
      type: 'dropdown',
      title: 'Juegos',
      items: [
        { to: '/games/daily', title: 'Diaria' },
        { to: '/games/play-three', title: 'Juega 3' },
        { to: '/games/date', title: 'Fecha' },
        { to: '/games/tica', title: 'Tica' },
        { to: '/games/termination-two', title: 'Terminación 2' },
        { to: '/games/mega-combo', title: 'Mega Combo' }
      ]
    },
    { type: 'divider' },
    { to: '/invoices', title: 'Facturas' },
    { to: '/branch-offices', title: 'Sucursales' },
    { to: '/reports', title: 'Reportes' },
    { to: '/payments', title: 'Pagos' },
    { to: '/bills', title: 'Gastos' }
  ]

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id={id} aria-labelledby={`${id}Label`}>
      <div className="offcanvas-header border-bottom border-2">
        <h5 className="offcanvas-title fw-bold text-success" id={`${id}Label`}>
          <img src="/images/logo.svg" className="me-2" alt="" width="32"/>
          Rifas Trebol
        </h5>
        <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <MenuItemList items={sideBarItems} />
        </ul>
      </div>
    </div>
  )
}
