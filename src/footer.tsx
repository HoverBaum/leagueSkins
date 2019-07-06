/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer
    css={css`
      margin-top: 2rem;
      padding: 2rem;
      padding-bottom: 0.5rem;
      font-weight: 300;
    `}
  >
    <div
      css={css`
        width: 100%;
        height: 1px;
        background-color: var(--theme-text);
        opacity: 0.3;
      `}
    />
    <div
      css={css`
        display: flex;
        justify-content: center;
        padding-top: 2rem;
      `}
    >
      <ul
        css={css`
          display: flex;
          & li {
            list-style-type: none;
            margin-right: 1rem;
          }
        `}
      >
        <li>
          <Link to="/">Skins</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  </footer>
)

export default Footer
