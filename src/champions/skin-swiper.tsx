/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { SkinLoaded } from './champion'
import { useRef, useReducer } from 'react'
import useWindowSize from '../hooks/useWindowSize'

interface SwiperState {
  startX: number
  isSwiping: boolean
  currentX: number
  isSwipingRight: boolean
}

const initialSwiperState: SwiperState = {
  startX: 0,
  isSwiping: false,
  currentX: 0,
  isSwipingRight: false,
}

const swipingReducer = (
  state: SwiperState = initialSwiperState,
  action: any
): SwiperState => {
  switch (action.type) {
    case 'start':
      return {
        isSwiping: true,
        startX: action.x,
        currentX: action.x,
        isSwipingRight: false,
      }
    case 'swipe':
      return {
        ...state,
        currentX: action.x,
        isSwipingRight: action.x > state.startX,
      }
    case 'stop':
      return initialSwiperState
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
  const {
    isSwiping,
    isSwipingRight,
    startX: touchStartX,
    currentX: currentTouchX,
  } = state

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
        const absoluteIndexDifference = Math.abs(indexDifference)
        const maxDragDistance = 200

        // Shadows
        const currentBoxShadow =
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
        const boxShadow =
          '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'

        // Positioning of image
        let zIndex = 1100 - absoluteIndexDifference
        const translateDistance = 5
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
        if (isCurrent && isSwiping) {
          let distance = Math.abs(touchStartX - currentTouchX)
          if (distance > maxDragDistance) distance = maxDragDistance
          left = touchStartX - currentTouchX < 0 ? distance : -distance
        }

        // Drag image next to current one along during swipe.
        if (isSwiping && absoluteIndexDifference === 1) {
          let distance = Math.abs(touchStartX - currentTouchX)
          if (distance > maxDragDistance) {
            distance = maxDragDistance
          }
          if (isPositionedLeft && isSwipingRight) {
            left = left + distance
            zIndex = zIndex + absoluteIndexDifference + 1
          }
          if (isPositionedRight && !isSwipingRight) {
            left = left - distance
            zIndex = zIndex + absoluteIndexDifference + 1
          }
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
              z-index: ${zIndex};
            `}
          >
            <img
              onTouchStart={e =>
                isCurrent &&
                dispatch({ type: 'start', x: e.changedTouches[0].clientX })
              }
              onTouchMove={e =>
                isCurrent &&
                dispatch({ type: 'swipe', x: e.changedTouches[0].clientX })
              }
              onTouchEnd={e => {
                if (!isCurrent) return
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
