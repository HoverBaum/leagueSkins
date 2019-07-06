/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const About = () => (
  <article
    css={css`
      max-width: 50rem;
      margin: 0 auto;
    `}
  >
    <h2>About</h2>

    <p>
      Welcome to LeagueSkins, a fun little project I created years ago as part
      of an application to get notifications on skin sales. Back then you could
      register an account and favorite skins. We would then send you an E-Mail
      once a skin you favorites came on sale.
    </p>

    <p>
      What is left today is a tool to explore existing skins in League of
      Legends.
    </p>

    <h3>Links</h3>

    <p>
      You can find this site on{' '}
      <a href="https://github.com/HoverBaum/leagueSkins">GitHub</a>.
    </p>

    <p>
      A project by <a href="https://hendrikwallbaum.de/">Hendrik Wallbaum</a>.
    </p>
  </article>
)

export default About
