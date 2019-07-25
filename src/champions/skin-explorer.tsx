import React from 'react'
import SkinModal from './skin-modal'
import SkinOverlay from './skin-overlay'
import { Champion, Skin, Position } from './champion'
import useBreakpoints from '../hooks/useBreakpoints'

const SkinExplorer = ({
  match,
  champions,
  startPosition,
  history,
}: {
  match: any
  champions: Champion[]
  startPosition: Position
  history: any
}) => {
  const { isMobile } = useBreakpoints()

  const championId = match.params.championId

  const champion = champions.find(cha => cha.id === championId)

  const closeExplorer = () => {
    history.push('/')
  }

  return (
    <React.Fragment>
      {champion && !isMobile && (
        <SkinModal
          loadingImageURL={champion.image}
          skins={champion.skins as Skin[]}
          onClose={closeExplorer}
          originalPosition={startPosition}
        />
      )}
      {champion && isMobile && (
        <SkinOverlay
          loadingImageURL={champion.image}
          onClose={closeExplorer}
          skins={champion.skins as Skin[]}
        />
      )}
    </React.Fragment>
  )
}
export default SkinExplorer
