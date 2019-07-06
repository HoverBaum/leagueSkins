/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { SkinLoaded } from './champion'

const SkinDisplay = ({
  skins,
  currentIndex,
}: {
  skins: SkinLoaded[]
  currentIndex: number
}) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 500;
        overflow: hidden;
      `}
    >
      {skins.map((skin, index) => {
        const shouldBeLeft = index <= currentIndex
        const indexDifference = index - currentIndex
        return (
          <img
            key={skin.number}
            src={skin.splashImage}
            css={css`
              width: 100%;
              height: auto;
              position: absolute;
              top: 0;
              left: ${shouldBeLeft ? 0 : `${window.innerWidth}px`};
              z-index: ${500 + indexDifference};
              transition: 0.3s ease-out;
              box-shadow: -10px 0px 5px 0px rgba(0, 0, 0, 0.75);
            `}
            alt={skin.name}
          />
        )
      })}
    </div>
  )
}

export default SkinDisplay
