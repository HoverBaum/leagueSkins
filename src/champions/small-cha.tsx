/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const SmallCha = ({ name, imageURL }: { name: string; imageURL: string }) => (
  <div
    css={css`
      width: 100px;
      height: 120px;
      padding: 0.5rem;
      box-sizing: border-box;
    `}
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
          border: 3px solid #ffd700;
        }
      `}
      src={imageURL}
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
