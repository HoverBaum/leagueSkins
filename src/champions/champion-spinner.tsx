/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Fragment } from 'react'
import SkinSelector from './skin-selector'
import { SkinLoaded } from './champion'
import { useState } from 'react'
import SkinDisplay from './skin-display'

const ChampionSpinner = ({ skins }: { skins: SkinLoaded[] }) => {
  const [currentSkindIndex, setCurrentSkinIndex] = useState(0)
  return (
    <Fragment>
      <SkinDisplay skins={skins} currentIndex={currentSkindIndex} />
      <div
        css={css`
          position: absolute;
          bottom: 5%;
          left: 2%;
          z-index: 1000;
        `}
      >
        <SkinSelector
          skins={skins}
          currentSkinIndex={currentSkindIndex}
          setCurrentSkinIndex={setCurrentSkinIndex}
        />
      </div>
      <div
        css={css`
          position: absolute;
          left: 0;
          top: 80%;
          height: 20%;
          width: 100%;
          background-color: white;
          z-index: 900;
        `}
      >
        <span
          css={css`
            position: absolute;
            top: 40%;
            left: 52%;
            font-size: 2em;
            font-weight: 300;
          `}
        >
          {skins[currentSkindIndex].name}
        </span>
      </div>
    </Fragment>
  )
}

export default ChampionSpinner
