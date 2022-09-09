import { useState } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return {
    user,
    handleChange,
    handleSubmit
  }
}
