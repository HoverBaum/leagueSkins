/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { SkinLoaded } from './champion'
import { useRef, useReducer } from 'react'
import useWindowSize from '../hooks/useWindowSize'

interface SwiperState {
  startX: number
  swiping: boolean
  currentX: number
}

const initialSwiperState: SwiperState = {
  startX: 0,
  swiping: false,
  currentX: 0,
}

const swipingReducer = (
  state: SwiperState = initialSwiperState,
  action: any
): SwiperState => {
  switch (action.type) {
    case 'start':
      return {
        swiping: true,
        startX: action.x,
        currentX: action.x,
      }
    case 'swipe':
      return {
        ...state,
        currentX: action.x,
      }
    case 'stop':
      return {
        swiping: false,
        startX: 0,
        currentX: 0,
      }
    default:
      return state
  }
}

const SkinSwiper = ({
  skins,
  currentSkinIndex,
  setCurrentSkinIndex,
}: {
  skins: SkinLoaded[]
  currentSkinIndex: number
  setCurrentSkinIndex: Function
}) => {
  const ref = useRef(null)
  const { width: windowWidth = 0 } = useWindowSize()
  const [state, dispatch] = useReducer(swipingReducer, initialSwiperState)
  const { swiping, startX: touchStartX, currentX: currentTouchX } = state

  return (
    <div
      ref={ref}
      css={css`
        width: 75vw;
        height: 200px;
        perspective: 1000px;
        margin: 0 auto;
        position: relative;
      `}
    >
      {skins.map((skin, index) => {
        const isCurrent = index === currentSkinIndex
        const indexDifference = index - currentSkinIndex
        const translateDistance = 5
        const currentBoxShadow =
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
        const boxShadow =
          '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        const containerWidth = windowWidth * 0.7
        const baseLeft = 0
        let left = 0
        const isPositionedLeft = indexDifference < 0
        if (isPositionedLeft) {
          left = baseLeft - containerWidth + indexDifference * translateDistance
        }
        const isPositionedRight = indexDifference > 0
        if (isPositionedRight) {
          left = baseLeft + containerWidth + indexDifference * translateDistance
        }
        if (isCurrent && swiping) {
          let distance = Math.abs(touchStartX - currentTouchX)
          if (distance > 200) distance = 200
          left = touchStartX - currentTouchX < 0 ? distance : -distance
        }

        return (
          <div
            key={skin.name}
            css={css`
              position: absolute;
              display: block;
              width: 100%;
              transition: all 0.3s ease-out;
              cursor: pointer;
              left: ${left}px;
              transform: ${isCurrent ? 'scale(1.05)' : ''};
              z-index: ${1100 - Math.abs(indexDifference)};
            `}
          >
            <img
              onTouchStart={e =>
                dispatch({ type: 'start', x: e.changedTouches[0].clientX })
              }
              onTouchMove={e =>
                dispatch({ type: 'swipe', x: e.changedTouches[0].clientX })
              }
              onTouchEnd={e => {
                const touchDistance = Math.abs(
                  e.changedTouches[0].clientX - touchStartX
                )
                dispatch({ type: 'stop' })
                const didSwipedLeft = e.changedTouches[0].clientX > touchStartX
                if (touchDistance > 50) {
                  const nextIndex = didSwipedLeft
                    ? currentSkinIndex - 1
                    : currentSkinIndex + 1
                  if (nextIndex >= 0 && nextIndex < skins.length) {
                    setCurrentSkinIndex(nextIndex)
                  }
                }
              }}
              src={skin.splashImage}
              alt={`${skin.name} selector`}
              onClick={() => setCurrentSkinIndex(index)}
              css={css`
                width: 100%;
                height: auto;
                box-shadow: ${isCurrent ? currentBoxShadow : boxShadow};
              `}
            />
            {isCurrent && (
              <h2
                css={css`
                  text-align: center;
                `}
              >
                {skin.shortName}
              </h2>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SkinSwiper
