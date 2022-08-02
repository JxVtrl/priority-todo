import { useState, useEffect } from 'react'

export function setWindowWidth(
  width,
  minWidth,
  maxWidth
) {
  switch (true) {
    case !minWidth:
      return width <= maxWidth
    case !maxWidth:
      return width >= minWidth
    default:
      return width >= minWidth && width <= maxWidth
  }
}

export function useDevice() {
  const [width, setWidth] = useState(window.innerWidth)

  const resizeHandler = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  const device = {
    isMobileSM: setWindowWidth(width, 0, 440),
    isMobileLG: setWindowWidth(width, 441, 1024),
    isDestop: setWindowWidth(width, 1025, 0),
  }

  return { device }
}
