/** @jsx jsx */
import { jsx } from '@emotion/core'
import SkinSelector from './skin-selector'
import { SkinLoaded } from './champion'
import { useState } from 'react'

const ChampionSpinner = ({ skins }: { skins: SkinLoaded[] }) => {
  const [currentSkindIndex, setCurrentSkinIndex] = useState(0)
  return (
    <SkinSelector
      skins={skins}
      currentSkinIndex={currentSkindIndex}
      setCurrentSkinIndex={setCurrentSkinIndex}
    />
  )
}

export default ChampionSpinner
