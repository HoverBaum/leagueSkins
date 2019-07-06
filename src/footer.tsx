import { Fragment } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'

const Footer = () => (
  <Fragment>
    <div
      css={css`
        height: 1px;
        background-color: #02182b;
        margin-top: 4rem;
      `}
    />
    <footer
      css={css`
        padding: 2rem;
        padding-bottom: 0.5rem;
        display: flex;
        justify-content: center;
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
  </Fragment>
)

export default Footer
