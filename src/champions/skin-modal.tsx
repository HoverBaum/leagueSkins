/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Skin, Position } from './champion'
import Loader from '../loader'
import useOutsideClick from '../hooks/useOutsideClick'
import { useRef, useEffect, useState, Fragment } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import ChampionSpinner from './champion-spinner'
import useSkinImages from './useSkinImages'

const SkinModal = ({
  loadingImageURL,
  onClose,
  skins,
  originalPosition,
}: {
  loadingImageURL: string
  onClose: Function
  skins: Skin[]
  originalPosition?: Position
}) => {
  const loadedSkins = useSkinImages(skins)
  const [waitedLongEnough, setWaitedLongEnough] = useState(false)
  const { width = 100 } = useWindowSize()
  const ref = useRef(null)
  useOutsideClick(ref, onClose)

  const widthRation = width > 1280 ? 0.7 : 0.9
  const modalWith = width * widthRation
  const modalHeight = (modalWith * 9) / 16

  useEffect(() => {
    const modalOpeningDuration = 300
    const modalPosition: Position = {
      left: `${(width - modalWith) / 2}px`,
      top: '10vh',
      width: `${modalWith}px`,
      height: `${modalHeight}px`,
    }

    if (originalPosition) {
      // @ts-ignore
      ref.current.animate([originalPosition, modalPosition], {
        duration: modalOpeningDuration,
        fill: 'forwards',
        easing: 'ease-out',
      })
    }

    setTimeout(() => setWaitedLongEnough(true), modalOpeningDuration * 2)
  }, [modalHeight, modalWith, originalPosition, width])

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
          width: ${modalWith}px;
          height: ${modalHeight}px;
          background-color: #fff;
          min-height: 20px;
          animation-fill-mode: forwards;
          box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24);
        `}
      >
        {(loadedSkins.length === 0 || !waitedLongEnough) && (
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
        {loadedSkins.length > 0 && waitedLongEnough && (
          <ChampionSpinner skins={loadedSkins} />
        )}
      </div>
    </Fragment>
  )
}

export default SkinModal
