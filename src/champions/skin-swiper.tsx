/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { SkinLoaded } from './champion'
import { useRef, useState } from 'react'

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
  const [touchStartX, setTouchStartX] = useState(0)

  return (
    <div
      ref={ref}
      css={css`
        width: 75vw;
        height: 200px;
        perspective: 1000px;
        margin: 0 auto;
      `}
    >
      {skins.map((skin, index) => {
        const isCurrent = index === currentSkinIndex
        const indexDifference = index - currentSkinIndex
        const translateDistance = 5
        const translateBaseDistance = 30
        let factorForTranslation = indexDifference
        if (factorForTranslation < -5) factorForTranslation = -5
        if (factorForTranslation > 5) factorForTranslation = 5
        const xTranslate = isCurrent
          ? '-50%'
          : `${
              indexDifference < 0
                ? factorForTranslation * translateDistance -
                  (100 + translateBaseDistance)
                : factorForTranslation * translateDistance +
                  translateBaseDistance
            }%`
        const currentBoxShadow =
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
        const boxShadow =
          '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        return (
          <div
            key={skin.name}
            css={css`
              position: absolute;
              display: block;
              width: 100%;
              transition: all 0.3s ease-out;
              cursor: pointer;
              left: 50%;
              transform: translateX(${xTranslate})
                ${isCurrent ? 'scale(1.05)' : ''};
              z-index: ${1100 - Math.abs(indexDifference)};
            `}
          >
            <img
              onTouchStart={e => setTouchStartX(e.changedTouches[0].clientX)}
              onTouchEnd={e => {
                const touchDistance = Math.abs(
                  e.changedTouches[0].clientX - touchStartX
                )
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
