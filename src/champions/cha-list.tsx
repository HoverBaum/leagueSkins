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
    `}
  >
    {champions.map(renderItem)}
  </ul>
)

export default ChaList
