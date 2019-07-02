import { useEffect, MutableRefObject } from 'react'

const useOutsideClick = (ref: MutableRefObject<any>, callback: Function) => {
  const handleClick: EventListener = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useOutsideClick
