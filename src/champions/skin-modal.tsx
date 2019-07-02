/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Skin } from './champion'

const SkinModal = ({
  loadingImageURL,
  skins,
}: {
  loadingImageURL: string
  skins: Skin[]
}) => (
  <div>
    <img src={loadingImageURL} />
  </div>
)

export default SkinModal
