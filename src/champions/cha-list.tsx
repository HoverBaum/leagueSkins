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
      padding: 0;
      margin: 0 auto;
      /* For fex champions we position them centered, like search results. */
      ${champions.length <= 5
        ? css`
            display: flex;
            flex-direction: row;
            justify-content: center;
          `
        : css`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          `}
    `}
  >
    {champions.map(renderItem)}
  </ul>
)

export default ChaList
