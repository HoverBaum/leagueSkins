import { Skin, SkinLoaded } from './champion'
import { useEffect, useState } from 'react'

const useSkinImages = (skins: Skin[]) => {
  const initialLoadedSkins: SkinLoaded[] = []
  const [loadedSkins, setLoadedSkins] = useState(initialLoadedSkins)

  useEffect(() => {
    const loadImages = async () => {
      const skinsWithImages = await Promise.all(
        skins.map(
          skin =>
            new Promise(resolve => {
              const loadingImage = new Image()
              loadingImage.setAttribute('crossOrigin', 'Anonymous')
              loadingImage.onload = () => {
                const loadingCanvas = document.createElement('canvas')
                loadingCanvas.width = loadingImage.naturalWidth
                loadingCanvas.height = loadingImage.naturalHeight
                const loadingContext = loadingCanvas.getContext('2d')
                if (loadingContext) loadingContext.drawImage(loadingImage, 0, 0)

                // now also load splash art.
                const splashImage = new Image()
                splashImage.setAttribute('crossOrigin', 'Anonymous')
                splashImage.onload = () => {
                  const splashCanvas = document.createElement('canvas')
                  splashCanvas.width = splashImage.naturalWidth
                  splashCanvas.height = splashImage.naturalHeight
                  const splashContext = splashCanvas.getContext('2d')
                  if (splashContext) splashContext.drawImage(splashImage, 0, 0)

                  // We have both images loaded now and can resolve.
                  resolve({
                    ...skin,
                    loadingImage: loadingCanvas.toDataURL(),
                    splashImage: splashCanvas.toDataURL(),
                  })
                }
                splashImage.src = skin.splashImageUrl
              }
              loadingImage.src = skin.loadingImageUrl
            })
        )
      )
      // @ts-ignore
      setLoadedSkins(skinsWithImages)
    }
    loadImages()
  }, [skins])

  return loadedSkins
}

export default useSkinImages
