import { Link } from 'react-router-dom'

export default function ({ to, title, className }) {
  if (!`${className}`.includes('nav-link') && !`${className}`.includes('nav-brand')) {
    className += ' nav-link'
  }

  return (
    <Link
      key={to}
      to={to}
      className={className}
    >
      {title}
    </Link>
  )
}
