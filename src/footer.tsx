/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer
    css={css`
      margin-top: 4rem;
      padding: 2rem;
      padding-bottom: 0.5rem;
      display: flex;
      justify-content: center;
      border-top: 1px solid var(--theme-text);
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
  </footer>
)

export default Footer
