import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { Champion } from './champion'
import { useEffect, useState } from 'react'
import SkinModal from './skin-modal'
import Loader from '../loader'
import ChaList from './cha-list'
import SmallCha from './small-cha'

const Champions = () => {
  const initialChampionState: Champion[] = []
  const [champions, setChampions] = useState(initialChampionState)
  const [selectedChampion, setSelectedChampion] = useState()
  const [shouldDisplaySpinnerYet, setShouldDisplaySpinnerYet] = useState(false)

  useEffect(() => {
    const fetchChas = async () => {
      const skinsUrl = /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(
        window.location.hostname
      )
        ? '/testData/skins.json'
        : '/skins.json'
      const champions = await fetch(skinsUrl).then(response => response.json())
      await Promise.all(
        champions.map(
          (champion: Champion) =>
            new Promise(resolve => {
              const image = new Image()
              image.addEventListener('load', () => {
                resolve()
              })
              image.src = champion.squareImageUrl
            })
        )
      )
      console.log('chas', champions)
      setChampions(champions)
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
          loadingImageURL={selectedChampion.squareImageUrl}
          skins={selectedChampion.skins}
          onClose={() => setSelectedChampion(null)}
        />
      )}
      {champions.length > 0 && (
        <ChaList
          champions={champions}
          renderItem={(cha: Champion) => (
            <SmallCha
              key={cha.id}
              name={cha.name}
              imageURL={cha.squareImageUrl}
              onClick={() => setSelectedChampion(cha)}
            />
          )}
        />
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
