import { useEffect, useState } from 'react'

const useLoaderState = () => {
  const [shouldDisplayLoader, setShouldDisplayLoader] = useState(false)

  const timeToLoaderDisplay = 100

  useEffect(() => {
    setTimeout(() => setShouldDisplayLoader(true), timeToLoaderDisplay)
  }, [])

  return [shouldDisplayLoader]
}

export default useLoaderState
