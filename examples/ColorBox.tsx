import { colorBoxStyle } from './styles.css'
import { hsla, parseToHsla, readableColorIsBlack, toHex } from 'color2k'

interface ColorBoxProps {
  color: string
}

function ColorBox({ color }: ColorBoxProps) {
  return <div className={colorBoxStyle} style={{
    backgroundColor: color,
    color: readableColorIsBlack(color) ? '#000' : '#fff',
  }}>
    <div>{toHex(color)}</div>
    <div>{hsla(...parseToHsla(color))}</div>
  </div>
}

export default ColorBox
