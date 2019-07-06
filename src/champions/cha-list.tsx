/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { Champion } from './champion'

const ChaList = ({
  champions,
  renderItem,
}: {
  champions: Champion[]
  renderItem: any
}) => (
  <ul
    css={css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0;
      margin: 0 auto;
      ${champions.length === 1 ? 'justify-content: center;' : ''}
    `}
  >
    {champions.map(renderItem)}
  </ul>
)

export default ChaList
