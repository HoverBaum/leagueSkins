/** @jsx jsx */
import { jsx } from '@emotion/core'

import SmallCha from './small-cha'
import { Champion } from './champion'
import { useEffect, useState } from 'react'

const ChaList = () => {
  const initialChaState: Champion[] = []
  const [chas, setChas] = useState(initialChaState)

  useEffect(() => {
    const fetchChas = async () => {
      const chas = await fetch('/testData/skins.json')
        .then(response => response.json())
      console.log('chas', chas)
      setChas(chas)
    }
    fetchChas()
  }, [])

  return (
    <ul>
      {chas.map(cha => <SmallCha key={cha.id} />)}
    </ul>
  )
}

export default ChaList
