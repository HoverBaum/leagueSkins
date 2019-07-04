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
        position: absolute;
        width: 600px;
        height: 200px;
        perspective: 1000px;
        bottom: 5%;
        left: 2%;
        z-index: 1000;
      `}
    >
      {skins.map((skin, index) => {
        const isCurrent = index === currentSkinIndex
        const indexDifference = index - currentSkinIndex
        const translateDistance = 30
        const translateBaseDistance = 30
        const xTranslate = isCurrent
          ? '-50%'
          : `${
              indexDifference < 0
                ? indexDifference * translateDistance -
                  (100 + translateBaseDistance)
                : indexDifference * translateDistance + translateBaseDistance
            }%`
        const yRotate = isCurrent
          ? '0deg'
          : `${indexDifference < 0 ? '-' : ''}25deg`
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
      <span
        css={css`
          position: absolute;
          top: -30px;
          color: white;
          font-family: sans-serif;
          text-shadow: 1px 1px 0px #000;
        `}
      >
        {skins[currentSkinIndex].shortName}
      </span>
    </div>
  )
}

export default SkinSelector
