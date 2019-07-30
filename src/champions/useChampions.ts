import { useCallback, useState, useEffect } from 'react'
import { Champion } from './champion'

const useChampions = () => {
  const initialChampionState: Champion[] = []
  const [champions, setChampions] = useState(initialChampionState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [championProgress, setchampionProgress] = useState(0)

  const fetchChas = useCallback(async () => {
    setLoading(true)
    setError('')
    setchampionProgress(0)
    const skinsUrl =
      /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(
        window.location.hostname
      ) &&
      window.location.search.indexOf('all') === -1 &&
      false
        ? '/testData/skins.json'
        : '/skins.json'

    let champions
    let championsWithImages
    let loadedChampions = 0
    try {
      champions = await fetch(skinsUrl).then(response => response.json())
      championsWithImages = await Promise.all(
        champions.map(
          (champion: Champion) =>
            new Promise((resolve, reject) => {
              const image = new Image()
              image.setAttribute('crossOrigin', 'Anonymous')
              image.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = image.naturalWidth
                canvas.height = image.naturalHeight
                const context = canvas.getContext('2d')
                if (context) context.drawImage(image, 0, 0)
                resolve({
                  ...champion,
                  image: canvas.toDataURL(),
                })
                loadedChampions += 1
                setchampionProgress(loadedChampions / champions.length)
              }
              image.onerror = () => reject()
              image.src = champion.squareImageUrl
            })
        )
      )
    } catch (e) {
      setLoading(false)
      setError('Failed loading champions')
    }

    console.log('chas', champions)
    setLoading(false)
    setChampions(championsWithImages as Champion[])
  }, [])

  useEffect(() => {
    fetchChas()
  }, [fetchChas])

  return { champions, loading, error, championProgress }
}

export default useChampions
