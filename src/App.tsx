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
            html {
              --color-blue: #1469cc;
              --color-yellow: #ffd700;
              --color-really-dark-blue: #02182b;
              --color-really-light-yellow: #f8ffe5;
              --color-red: #ff715b;

              --theme-primary: var(--color-blue);
              --theme-accent: var(--color-yellow);
              --theme-text: var(--color-really-dark-blue);
              --theme-alert: var(--color-red);

              --mdc-theme-primary: var(--theme-primary);
            }
            * {
              font-family: 'Roboto', sans-serif;
              color: var(--theme-text);
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
              color: var(--theme-text);
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
