/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Skin } from './champion'
import Loader from '../loader'
import useOutsideClick from '../hooks/useOutsideClick'
import { useRef } from 'react'

const SkinModal = ({
  loadingImageURL,
  onClose,
  skins,
}: {
  loadingImageURL: string
  onClose: Function
  skins: Skin[]
}) => {
  const ref = useRef(null)
  useOutsideClick(ref, onClose)

  return (
    <div
      ref={ref}
      css={css`
        position: fixed;
        left: 15vw;
        top: 10vh;
        width: 70vw;
        height: 60vh;
        background-color: #fff;
        min-height: 20px;
        animation-fill-mode: forwards;
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24);
      `}
    >
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
    </div>
  )
}

export default SkinModal
