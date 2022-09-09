import { useState } from 'react'

export const useAnimation = () => {
  const [animation, setAnimation] = useState(false)

  const handleAnimation = (value) => {
    setAnimation(value ?? false)
  }

  return {
    animation,
    handleAnimation
  }
}
