import AddRecord from '~/components/Games/AddRecord'
import { store } from './playThree.services'

export default function PlayThree () {
  return <AddRecord
    store={store}
    format='xxx'
    title='Juega 3'
    multiply={610}
    hideTypeGame
  />
}
