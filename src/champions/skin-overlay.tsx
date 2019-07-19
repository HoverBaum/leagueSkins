/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import MaterialIcon from '@material/react-material-icon'
import useSkinImages from './useSkinImages'
import { Skin, SkinLoaded } from './champion'
import SkinSwiper from './skin-swiper'

const SkinOverlay = ({
  onClose,
  skins,
}: {
  onClose: Function
  skins: Skin[]
}) => {
  const loadedSkins: SkinLoaded[] = useSkinImages(skins)
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
          right: 1rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.66;
          color: var(--theme-text);
          &:hover {
            opacity: 1;
          }
        `}
        onClick={() => onClose()}
      >
        <MaterialIcon className="close-icon" role="button" icon="close" />
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
        <SkinSwiper skins={loadedSkins} />
      </div>
    </div>
  )
}
export default SkinOverlay
