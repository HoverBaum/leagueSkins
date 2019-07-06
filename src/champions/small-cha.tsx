/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useRef } from 'react'
import { Position } from './champion'

const SmallCha = ({
  name,
  imageURL,
  onClick,
}: {
  name: string
  imageURL: string
  onClick: Function
}) => {
  const ref = useRef(null)
  return (
    <div
      css={css`
        width: 100px;
        height: 120px;
        padding: 0.5rem;
        box-sizing: border-box;
      `}
      onClick={() => {
        const {
          left: clickedLeft,
          top: clickedTop,
          right: clickedRight,
          bottom: clickedBottom,
          // @ts-ignore
        } = ref.current.getBoundingClientRect()
        const clickedWidth = clickedRight - clickedLeft
        const clickedHight = clickedBottom - clickedTop
        const position: Position = {
          left: clickedLeft + 'px',
          top: clickedTop + 'px',
          width: clickedWidth + 'px',
          height: clickedHight + 'px',
        }
        onClick(position)
      }}
    >
      <img
        ref={ref}
        css={css`
          width: 100%;
          height: auto;
          transition: all 0.3s ease-out;
          cursor: pointer;
          box-sizing: border-box;
          &:hover {
            border-radius: 50%;
            border: 3px solid var(--theme-accent);
          }
        `}
        src={imageURL}
        alt={`${name} portrait`}
      />
      <span
        css={css`
          height: 1.2rem;
          display: block;
          overflow: hidden;
          font-size: 0.9rem;
          text-align: center;
        `}
      >
        {name}
      </span>
    </div>
  )
}

export default SmallCha
