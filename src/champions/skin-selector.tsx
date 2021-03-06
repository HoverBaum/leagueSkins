/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { SkinLoaded } from './champion'
import { useRef } from 'react'

const SkinSelector = ({
  skins,
  currentSkinIndex,
  setCurrentSkinIndex,
}: {
  skins: SkinLoaded[]
  currentSkinIndex: number
  setCurrentSkinIndex: Function
}) => {
  const ref = useRef(null)

  return (
    <div
      ref={ref}
      css={css`
        width: 600px;
        height: 200px;
        perspective: 1000px;
      `}
    >
      {skins.map((skin, index) => {
        const isCurrent = index === currentSkinIndex
        const indexDifference = index - currentSkinIndex
        const translateDistance = 30
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
        const yRotate = isCurrent ? '0deg' : `${indexDifference * 5}deg`
        const currentBoxShadow =
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
        const boxShadow =
          '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        return (
          <img
            src={skin.loadingImage}
            alt={`${skin.name} selector`}
            onClick={() => setCurrentSkinIndex(index)}
            key={skin.name}
            css={css`
              position: absolute;
              display: block;
              height: 100%;
              width: auto;
              transition: all 0.3s ease-out;
              cursor: pointer;
              left: 50%;
              transform: translateX(${xTranslate}) rotateY(${yRotate})
                ${isCurrent ? 'scale(1.1)' : ''};
              z-index: ${1100 - Math.abs(indexDifference)};
              box-shadow: ${isCurrent ? currentBoxShadow : boxShadow};
            `}
          />
        )
      })}
    </div>
  )
}

export default SkinSelector
