import AddRecord from '~/components/Games/AddRecord'
import { store } from './daily.services'

export default function Daily () {
  return <AddRecord
    store={store}
    title='Diaria'
    multiply={80}
  />
}
