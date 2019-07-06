/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const SmallCha = ({
  name,
  imageURL,
  onClick,
}: {
  name: string
  imageURL: string
  onClick: React.MouseEventHandler
}) => (
  <div
    css={css`
      width: 100px;
      height: 120px;
      padding: 0.5rem;
      box-sizing: border-box;
    `}
    onClick={onClick}
  >
    <img
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

export default SmallCha
