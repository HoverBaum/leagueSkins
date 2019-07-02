/** @jsx jsx */
import { jsx, css, keyframes, SerializedStyles } from '@emotion/core'

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`

const Loader = ({ styles = css`` }: { styles?: SerializedStyles }) => (
  <div
    css={css`
      width: 100px;
      position: relative;
      ${styles}
      &:before {
        content: '';
        display: block;
        padding-top: 100%;
      }
    `}
  >
    <svg
      css={css`
        animation: ${rotate} 2s linear infinite;
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      `}
      viewBox="25 25 50 50"
    >
      <circle
        css={css`
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
          animation: ${dash} 1.5s ease-in-out infinite;
          stroke: #ffd700;
          stroke-linecap: round;
        `}
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  </div>
)

export default Loader
