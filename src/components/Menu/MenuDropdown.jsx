import MenuItemList from './MenuItemList'

export default function ({ items, title }) {
  items = items.map((item) => ({
    ...item,
    className: 'dropdown-item'
  }))

  return (
    <li key={title} className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </a>

      <ul className="dropdown-menu dropdown-menu-dark">
        <MenuItemList items={items} />
      </ul>
    </li>
  )
}
