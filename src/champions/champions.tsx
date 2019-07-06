import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { Champion, Position } from './champion'
import { useEffect, useState } from 'react'
import SkinModal from './skin-modal'
import Loader from '../loader'
import ChaList from './cha-list'
import SmallCha from './small-cha'
import TextInput from '../text-input'

const Champions = () => {
  const initialChampionState: Champion[] = []
  const [champions, setChampions] = useState(initialChampionState)
  const [selectedChampion, setSelectedChampion] = useState()
  const [shouldDisplaySpinnerYet, setShouldDisplaySpinnerYet] = useState(false)
  const [filter, setFilter] = useState('')

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

  useEffect(() => {
    const fetchChas = async () => {
      const skinsUrl =
        /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(
          window.location.hostname
        ) && window.location.search.indexOf('all') === -1
          ? '/testData/skins.json'
          : '/skins.json'
      const champions = await fetch(skinsUrl).then(response => response.json())
      const championsWithImages: Champion[] = await Promise.all(
        champions.map(
          (champion: Champion) =>
            new Promise(resolve => {
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
              }
              image.src = champion.squareImageUrl
            })
        )
      )
      console.log('chas', champions)
      setChampions(championsWithImages)
    }
    fetchChas()

    // Make sure we only show a loading spinner to the user when loading does
    // not feel instant to them.
    setTimeout(() => {
      setShouldDisplaySpinnerYet(true)
    }, 100)
  }, [])

  return (
    <React.Fragment>
      {selectedChampion && (
        <SkinModal
          loadingImageURL={selectedChampion.champion.image}
          skins={selectedChampion.champion.skins}
          onClose={() => setSelectedChampion(null)}
          originalPosition={selectedChampion.startPosition}
        />
      )}
      {champions.length > 0 && (
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
      {champions.length === 0 && shouldDisplaySpinnerYet && (
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <Loader />
        </div>
      )}
    </React.Fragment>
  )
}

export default Champions
