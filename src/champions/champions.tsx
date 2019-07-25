import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import '@material/react-button/dist/button.css'
import Button from '@material/react-button'
import '@material/react-linear-progress/dist/linear-progress.css'
import LinearProgress from '@material/react-linear-progress'

import { Champion, Position } from './champion'
import { useState } from 'react'
import ChaList from './cha-list'
import SmallCha from './small-cha'
import TextInput from '../text-input'
import useLoaderState from '../hooks/useLoaderStates'
import { Route } from 'react-router'
import SkinExplorer from './skin-explorer'
import { Link } from 'react-router-dom'
import useChampions from './useChampions'

const Champions = ({ match }: { match: any }) => {
  const [startPosition, setStartPosition] = useState()

  const [filter, setFilter] = useState('')
  const [shouldDisplayLoader] = useLoaderState()

  const { champions, loading, error, championProgress } = useChampions()

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

  return (
    <React.Fragment>
      <Route
        path={`${match.path.replace(/\/$/, '')}/champion/:championId/skins`}
        component={(props: any) => (
          <SkinExplorer
            {...props}
            champions={champions}
            startPosition={startPosition}
          />
        )}
      />

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
              <Link key={cha.id} to={`/champion/${cha.id}/skins`}>
                <SmallCha
                  name={cha.name}
                  imageURL={cha.image}
                  onClick={(startPosition: Position) => {
                    setStartPosition(startPosition)
                  }}
                />
              </Link>
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
          <Button onClick={() => console.log('TODO')} outlined>
            Try again
          </Button>
        </div>
      )}
    </React.Fragment>
  )
}

export default Champions
