import { globalStyle, style } from '@vanilla-extract/css'

export default globalStyle('body', {
  backgroundColor: '#fff',
})

export const paletteStyle = style({
  width: '31%',
  display: 'inline-block',
  margin: '0 1%',
})

export const palettesStyle = style({
  margin: '0 2%',
})

export const colorBoxStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: 10,
  lineHeight: 1.5715,
  paddingTop: 8,
  paddingBottom: 8,
})
