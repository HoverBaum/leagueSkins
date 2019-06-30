import React from 'react';
import { Global, css } from '@emotion/core'
import ChasList from './champions/cha-list'

const App: React.FC = () => {
  return (
    <>
      <Global styles={css`
        * {
          font-family: sans-serif;
        }
      `} />
      <header>
        <h1>League Skins</h1>
        <ChasList />
      </header>
    </>
  );
}

export default App;
