import styled from 'styled-components'

const SVG = styled.svg`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
`

export const Background = () => (
  <SVG>
    <defs>
      <pattern
        id="background-pattern"
        x="0"
        y="0"
        width="300"
        height="300"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45) translate(-50, 50)"
      >
        <rect fill="#F2F3F0" x="0" y="0" width="250" height="250" rx="36" />
      </pattern>
    </defs>

    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      fill="url(#background-pattern)"
    />
  </SVG>
)
