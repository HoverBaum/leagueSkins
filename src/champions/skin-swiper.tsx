/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState } from 'react'
import { SkinLoaded } from './champion'

const SkinSwiper = ({ skins }: { skins: SkinLoaded[] }) => {
  const [index, setIndex] = useState(0)
  return (
    <div
      css={css`
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      {skins.map(skin => (
        <img
          css={css`
            width: 100%;
            scroll-snap-align: start;
          `}
          key={skin.number}
          src={skin.splashImage}
        />
      ))}
    </div>
  )
}

export default SkinSwiper
