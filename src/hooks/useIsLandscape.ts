import useWindowSize from './useWindowSize'

const useIsLandscape = () => {
  const { width, height } = useWindowSize()

  return width > height
}

export default useIsLandscape
