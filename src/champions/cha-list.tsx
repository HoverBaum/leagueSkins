import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import SmallCha from './small-cha'
import { Champion } from './champion'
import { useEffect, useState } from 'react'
import SkinModal from './skin-modal'

const ChaList = () => {
  const initialChampionState: Champion[] = []
  const [champions, setChampions] = useState(initialChampionState)
  const [selectedChampion, setSelectedChampion] = useState()

  useEffect(() => {
    const fetchChas = async () => {
      const skinsUrl = /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(
        window.location.hostname
      )
        ? '/testData/skins.json'
        : '/skins.json'
      const chas = await fetch(skinsUrl).then(response => response.json())
      console.log('chas', chas)
      setChampions(chas)
    }
    fetchChas()
  }, [])

  return (
    <React.Fragment>
      {selectedChampion && (
        <SkinModal
          loadingImageURL={selectedChampion.squareImageUrl}
          skins={selectedChampion.skins}
        />
      )}
      <ul
        css={css`
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        `}
      >
        {champions.map(cha => (
          <SmallCha
            key={cha.id}
            name={cha.name}
            imageURL={cha.squareImageUrl}
            onClick={() => setSelectedChampion(cha)}
          />
        ))}
      </ul>
    </React.Fragment>
  )
}

export default ChaList
