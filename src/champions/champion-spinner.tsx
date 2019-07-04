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
      <SkinSelector
        skins={skins}
        currentSkinIndex={currentSkindIndex}
        setCurrentSkinIndex={setCurrentSkinIndex}
      />
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
      />
    </Fragment>
  )
}

export default ChampionSpinner
