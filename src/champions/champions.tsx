import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import '@material/react-button/dist/button.css'
import Button from '@material/react-button'
import '@material/react-linear-progress/dist/linear-progress.css'
import LinearProgress from '@material/react-linear-progress'

import { Champion, Position } from './champion'
import { useEffect, useState, useCallback } from 'react'
import SkinModal from './skin-modal'
import ChaList from './cha-list'
import SmallCha from './small-cha'
import TextInput from '../text-input'
import useLoaderState from '../hooks/useLoaderStates'
import useBreakpoints from '../hooks/useBreakpoints'
import SkinOverlay from './skin-overlay'

const Champions = () => {
  const initialChampionState: Champion[] = []
  const [champions, setChampions] = useState(initialChampionState)
  const [selectedChampion, setSelectedChampion] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')
  const [shouldDisplayLoader] = useLoaderState()
  const [championProgress, setchampionProgress] = useState(0)
  const { isMobile } = useBreakpoints()

  const filterChampions = (
    champions: Champion[],
    filter: string
  ): Champion[] => {
    if (filter === '') return champions
    const filterRegEx = new RegExp(filter.replace(/\s/g, ''), 'i')
    const filteredChampions = champions.filter(champion => {
      let shouldBeIncluded = false
      if (filterRegEx.test(champion.name)) shouldBeIncluded = true
      // TODO: COMING SOON: also filter and search for skins.
      // const skins = champion.skins as Skin[]
      // const foundSkin: Boolean = skins.some(skin =>
      //   filterRegEx.test(skin.name.replace(/\s/g, ''))
      // )
      // if (foundSkin) return true
      return shouldBeIncluded
    })
    return filteredChampions
  }

  const fetchChas = useCallback(async () => {
    setLoading(true)
    setError('')
    setchampionProgress(0)
    const skinsUrl =
      /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(
        window.location.hostname
      ) && window.location.search.indexOf('all') === -1
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

  return (
    <React.Fragment>
      {selectedChampion && !isMobile && (
        <SkinModal
          loadingImageURL={selectedChampion.champion.image}
          skins={selectedChampion.champion.skins}
          onClose={() => setSelectedChampion(null)}
          originalPosition={selectedChampion.startPosition}
        />
      )}
      {selectedChampion && isMobile && (
        <SkinOverlay
          loadingImageURL={selectedChampion.champion.image}
          onClose={() => setSelectedChampion(null)}
          skins={selectedChampion.champion.skins}
        />
      )}
      {!loading && !error && champions && champions.length > 0 && (
        <React.Fragment>
          <TextInput
            styles={css`
              max-width: 50rem;
              margin: 0 auto;
              margin-bottom: 2rem;
            `}
            value={filter}
            onChange={setFilter}
            label={'Filter champions'}
          />
          <ChaList
            champions={filterChampions(champions, filter)}
            renderItem={(cha: Champion) => (
              <SmallCha
                key={cha.id}
                name={cha.name}
                imageURL={cha.image}
                onClick={(startPosition: Position) =>
                  setSelectedChampion({ champion: cha, startPosition })
                }
              />
            )}
          />
        </React.Fragment>
      )}
      {loading && shouldDisplayLoader && (
        <div
          css={css`
            max-width: 50rem;
            margin: 0 auto;
          `}
        >
          <LinearProgress
            progress={championProgress}
            indeterminate={championProgress === 0}
          />
          <p css={{ textAlign: 'center' }}>Loading Champions</p>
        </div>
      )}
      {error && !loading && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <p
            css={css`
              color: var(--theme-alert);
              font-size: 1.33rem;
              margin: 2rem;
            `}
          >
            <span role="img" aria-label="Sirene Emoji">
              🚨
            </span>
            {error}{' '}
            <span role="img" aria-label="Sirene Emoji">
              🚨
            </span>
          </p>
          <Button onClick={fetchChas} outlined>
            Try again
          </Button>
        </div>
      )}
    </React.Fragment>
  )
}

export default Champions
