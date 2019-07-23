/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import MaterialIcon from '@material/react-material-icon'
import useSkinImages from './useSkinImages'
import { Skin, SkinLoaded } from './champion'
import SkinSwiper from './skin-swiper'
import SkinSelector from './skin-selector'
import { useState } from 'react'

const SkinOverlay = ({
  onClose,
  skins,
}: {
  onClose: Function
  skins: Skin[]
}) => {
  const loadedSkins: SkinLoaded[] = useSkinImages(skins)
  const [skinIndex, setSkinIndex] = useState(0)
  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: white;
        z-index: 10;
      `}
    >
      {/* Close button */}
      <div
        css={css`
          position: absolute;
          top: 1rem;
          left: 1rem;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
          opacity: 0.66;
          color: var(--theme-text);
          &:hover {
            opacity: 1;
          }
        `}
        onClick={() => onClose()}
      >
        <MaterialIcon className="close-icon" role="button" icon="arrow_back" />
        <span
          css={css`
            font-size: 0.8em;
          `}
        >
          Close
        </span>
      </div>
      {/* END close button */}
      <div
        css={css`
          margin-top: 6rem;
          position: relative;
        `}
      >
        {/* <SkinSwiper skins={loadedSkins} /> */}
        <SkinSwiper
          skins={loadedSkins}
          currentSkinIndex={skinIndex}
          setCurrentSkinIndex={setSkinIndex}
        />
      </div>
    </div>
  )
}
export default SkinOverlay
