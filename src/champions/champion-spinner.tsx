/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import SkinSelector from './skin-selector'
import { SkinLoaded } from './champion'
import { useState } from 'react'

const ChampionSpinner = ({ skins }: { skins: SkinLoaded[] }) => {
  const [currentSkindIndex, setCurrentSkinIndex] = useState(0)
  return (
    <SkinSelector
      skins={skins}
      currentSkinIndex={currentSkindIndex}
      setCurrentSkinIndex={(index: number) => {
        setCurrentSkinIndex(index)
        console.log('setting index to ', index)
      }}
    />
  )
}

export default ChampionSpinner
