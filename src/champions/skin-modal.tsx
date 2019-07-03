/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Skin, SkinLoaded } from './champion'
import Loader from '../loader'
import useOutsideClick from '../hooks/useOutsideClick'
import { useRef, useEffect, useState } from 'react'
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
  const { width = 100 } = useWindowSize()
  const ref = useRef(null)
  useOutsideClick(ref, onClose)

  useEffect(() => {
    const loadImages = async () => {
      const skinsWithImages = await Promise.all(
        skins.map(
          skin =>
            new Promise(resolve => {
              const image = new Image()
              image.setAttribute('crossOrigin', 'Anonymous')
              image.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = image.naturalWidth
                canvas.height = image.naturalHeight
                const context = canvas.getContext('2d')
                if (context) context.drawImage(image, 0, 0)
                resolve({
                  ...skin,
                  loadingImage: canvas.toDataURL(),
                })
              }
              image.src = skin.loadingImageUrl
            })
        )
      )
      // @ts-ignore
      setLoadedSkins(skinsWithImages)
    }
    loadImages()
  }, [skins])

  return (
    <div
      ref={ref}
      css={css`
        position: fixed;
        left: 15vw;
        top: 10vh;
        width: ${width * 0.7}px;
        height: ${(width * 0.7 * 9) / 16}px;
        background-color: #fff;
        min-height: 20px;
        animation-fill-mode: forwards;
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24);
      `}
    >
      {loadedSkins.length === 0 ? (
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
      ) : (
        <ChampionSpinner skins={loadedSkins} />
      )}
    </div>
  )
}

export default SkinModal
