import React from 'react'
import { Global, css } from '@emotion/core'
import Champions from './champions/champions'

const App: React.FC = () => {
  return (
    <>
      <Global
        styles={css`
          * {
            font-family: sans-serif;
          }
        `}
      />
      <header>
        <h1>League Skins</h1>
        <Champions />
      </header>
    </>
  )
}

export default App
