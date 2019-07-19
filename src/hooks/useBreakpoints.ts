import useWindowSize from './useWindowSize'

const useBreakpoints = () => {
  const { width = 0, height = 0 } = useWindowSize()

  const breakpoints = {
    isLandscape: width > height,

    // If we don't get a width back, asume not mobile.
    isMobile: width > 0 && width <= 768,
  }

  return breakpoints
}

export default useBreakpoints
