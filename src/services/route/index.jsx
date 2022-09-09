import { Routes, Route } from 'react-router-dom'
import Home from '~/pages/home'
import Games from '~/pages/games'
import Daily from '~/pages/games/Daily'
import PlayThree from '~/pages/games/PlayThree'
import Date from '~/pages/games/Date'
import Layout from '~/components/Layout'
import Admin from '~/pages/Admin'
import Reports from '~/pages/Admin/Reports'
import Login from '~/pages/auth/login'
import NoMatch from '~/pages/error/no-match'
import Winners from '~/pages/Admin/Winners'

export default function RouteService () {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index path='/' element={<Home />} />
        <Route path='/games' element={<Games />} />
        <Route path='/admin/winners' element={<Winners />} />
        <Route path='/games/daily' element={<Daily />} />
        <Route path='/games/play-three' element={<PlayThree />} />
        <Route path='/games/date' element={<Date />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/reports' element={<Reports />} />
        <Route path='/login' element={<Login />} />
      </Route>

      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
