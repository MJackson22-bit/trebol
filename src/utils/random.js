const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const formatRandom = (min, max, format = 'xx') => {
  const length = format.length
  const number = random(min, max)

  return `${number}`.padStart(length, '0')
}
