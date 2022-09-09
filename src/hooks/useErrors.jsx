import { useState } from 'react'

export const useErrors = () => {
  const [errors, setErrors] = useState({})

  const handleErrors = (errors) => {
    setErrors(errors)
  }

  return {
    errors,
    handleErrors
  }
}
