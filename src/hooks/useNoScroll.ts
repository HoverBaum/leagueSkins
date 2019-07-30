import { useEffect } from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

const useNoScroll = () => {
  useEffect(() => {
    disableBodyScroll(document.createElement('div'))

    return clearAllBodyScrollLocks
  })
}

export default useNoScroll
