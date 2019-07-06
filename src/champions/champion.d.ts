export interface Champion {
  id: string
  name: string
  skins: Skin[] | SkinLoaded[]
  squareImageUrl: string
  image: string
}

export interface Skin {
  loadingImageUrl: string
  splashImageUrl: string
  name: string
  shortName: string
  number: number
}

export interface SkinLoaded {
  name: string
  loadingImage: string
  splashImage: string
  shortName: string
  number: number
}

export interface Position {
  left: string
  top: string
  width: string
  height: string
}
