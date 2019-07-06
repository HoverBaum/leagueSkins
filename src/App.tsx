/** @jsx jsx */
import { Global, jsx, css } from '@emotion/core'
import Champions from './champions/champions'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './about'
import Footer from './footer'

const App: React.FC = () => {
  return (
    <Router>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <Global
          styles={css`
            * {
              font-family: 'Roboto', sans-serif;
              color: #02182b;
            }
            html,
            body,
            #root {
              height: 100%;
              padding: 0;
              margin: 0;
            }
            h1 {
              font-weight: 300;
              font-size: 3rem;
            }
            h2 {
              font-weight: 300;
              font-size: 2rem;
            }
            h3 {
              font-weight: 300;
              font-size: 1.5rem;
              margin-top: 2em;
            }
            a {
              color: #1469cc;
            }
          `}
        />
        <header>
          <h1 style={{ textAlign: 'center' }}>League Skins</h1>
        </header>

        <main
          css={css`
            flex: 1;
            padding: 2rem;
          `}
        >
          <Route path="/" exact component={Champions} />
          <Route path="/about" exact component={About} />
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
