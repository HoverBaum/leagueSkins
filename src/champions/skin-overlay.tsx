/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import MaterialIcon from '@material/react-material-icon'
import useSkinImages from './useSkinImages'
import { Skin, SkinLoaded } from './champion'
import SkinSwiper from './skin-swiper'
import { useState } from 'react'
import useBreakpoints from '../hooks/useBreakpoints'
import Loader from '../loader'

const SkinOverlay = ({
  loadingImageURL,
  onClose,
  skins,
}: {
  loadingImageURL: string
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
        ${isLandscape ? '' : 'padding-top: 1rem;'}
      `}
    >
      {loadedSkins.length === 0 && (
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
        >
          <img
            src={loadingImageURL}
            css={css`
              border: 3px solid var(--theme-primary);
              border-radius: 50%;
              box-sizing: border-box;
              width: 84px;
              height: 84px;
            `}
            alt="Loading skins"
          />
          <Loader
            styles={css`
              position: absolute;
              top: -9px;
              left: -9px;
              width: 102px;
            `}
          />
        </div>
      )}
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
          margin: ${isLandscape ? '1rem' : '1em'} 0;
          text-align: center;
        `}
      >
        {isLandscape ? skins[skinIndex].name : skins[0].name}
      </h1>
      <div
        css={css`
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
