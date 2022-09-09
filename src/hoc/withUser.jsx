import { useAuth } from '~/hoc/useAuth'

export const withUser = (Component) => (props) => {
  const { data: user } = useAuth()

  return <Component {...props} user={user} />
}
