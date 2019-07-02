/**
 * Inspired by:
 * https://usehooks.com/useWindowSize/
 * Actually premature optimization here for server side rendering
 * but we got that for free 🤷‍
 */

import { useState, useEffect, useCallback } from 'react'

const useWindowSize = () => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }),
    [isClient]
  )

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient])

  return windowSize
}

export default useWindowSize
