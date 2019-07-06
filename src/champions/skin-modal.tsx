/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Skin, SkinLoaded } from './champion'
import Loader from '../loader'
import useOutsideClick from '../hooks/useOutsideClick'
import { useRef, useEffect, useState, Fragment } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import ChampionSpinner from './champion-spinner'

const SkinModal = ({
  loadingImageURL,
  onClose,
  skins,
}: {
  loadingImageURL: string
  onClose: Function
  skins: Skin[]
}) => {
  const initialLoadedSkins: SkinLoaded[] = []
  const [loadedSkins, setLoadedSkins] = useState(initialLoadedSkins)
  const [shouldDisplayLoaderYet, setShouldDisplayLoaderYet] = useState(false)
  const { width = 100 } = useWindowSize()
  const ref = useRef(null)
  useOutsideClick(ref, onClose)

  useEffect(() => {
    const loadImages = async () => {
      const skinsWithImages = await Promise.all(
        skins.map(
          skin =>
            new Promise(resolve => {
              const loadingImage = new Image()
              loadingImage.setAttribute('crossOrigin', 'Anonymous')
              loadingImage.onload = () => {
                const loadingCanvas = document.createElement('canvas')
                loadingCanvas.width = loadingImage.naturalWidth
                loadingCanvas.height = loadingImage.naturalHeight
                const loadingContext = loadingCanvas.getContext('2d')
                if (loadingContext) loadingContext.drawImage(loadingImage, 0, 0)

                // now also load splash art.
                const splashImage = new Image()
                splashImage.setAttribute('crossOrigin', 'Anonymous')
                splashImage.onload = () => {
                  const splashCanvas = document.createElement('canvas')
                  splashCanvas.width = splashImage.naturalWidth
                  splashCanvas.height = splashImage.naturalHeight
                  const splashContext = splashCanvas.getContext('2d')
                  if (splashContext) splashContext.drawImage(splashImage, 0, 0)

                  // We have both images loaded now and can resolve.
                  resolve({
                    ...skin,
                    loadingImage: loadingCanvas.toDataURL(),
                    splashImage: splashCanvas.toDataURL(),
                  })
                }
                splashImage.src = skin.splashImageUrl
              }
              loadingImage.src = skin.loadingImageUrl
            })
        )
      )
      // @ts-ignore
      setLoadedSkins(skinsWithImages)
    }
    loadImages()

    setTimeout(() => setShouldDisplayLoaderYet(true), 100)
  }, [skins])

  return (
    <Fragment>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: white;
          opacity: 0.666;
          cursor: pointer;
        `}
      />
      <div
        ref={ref}
        css={css`
          position: fixed;
          left: 15vw;
          top: 10vh;
          z-index: 10;
          width: ${width * 0.7}px;
          height: ${(width * 0.7 * 9) / 16}px;
          background-color: #fff;
          min-height: 20px;
          animation-fill-mode: forwards;
          box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24);
        `}
      >
        {loadedSkins.length === 0 && shouldDisplayLoaderYet && (
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
                border: 3px solid #1469cc;
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
        {loadedSkins.length > 0 && <ChampionSpinner skins={loadedSkins} />}
      </div>
    </Fragment>
  )
}

export default SkinModal
