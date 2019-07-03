export interface Champion {
  id: string
  name: string
  skins: Skin[] | SkinLoaded[]
  squareImageUrl: string
  image: string
}

export interface Skin {
  loadingImageUrl: string
  name: string
  shortName: string
}

export interface SkinLoaded {
  name: string
  loadingImage: string
  splashImage: string
  shortName: string
}
