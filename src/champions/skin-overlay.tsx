/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import MaterialIcon from '@material/react-material-icon'
import useSkinImages from './useSkinImages'
import { Skin, SkinLoaded } from './champion'
import SkinSwiper from './skin-swiper'
import { useState } from 'react'
import useBreakpoints from '../hooks/useBreakpoints'

const SkinOverlay = ({
  onClose,
  skins,
}: {
  onClose: Function
  skins: Skin[]
}) => {
  const loadedSkins: SkinLoaded[] = useSkinImages(skins)
  const [skinIndex, setSkinIndex] = useState(0)
  const { isLandscape } = useBreakpoints()
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
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
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
          Champions
        </span>
      </div>
      {/* END close button */}
      <h1
        css={css`
          margin: 1em 0;
          text-align: center;
        `}
      >
        {skins[0].name}
      </h1>
      <div
        css={css`
          position: relative;
          flex-grow: 1;
        `}
      >
        {/* <SkinSwiper skins={loadedSkins} /> */}
        <SkinSwiper
          skins={loadedSkins}
          currentSkinIndex={skinIndex}
          setCurrentSkinIndex={setSkinIndex}
        />
      </div>
      {!isLandscape && (
        <span
          css={css`
            display: block;
            width: 100%;
            opacity: 0.333;
            font-size: 0.8rem;
            text-align: center;
            position: absolute;
            bottom: 2rem;
          `}
        >
          Turn your device for a better view.
        </span>
      )}
    </div>
  )
}
export default SkinOverlay
