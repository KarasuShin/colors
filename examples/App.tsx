import { paletteStyle, palettesStyle } from './styles.css'
import ColorBox from './ColorBox'
import generate from '../src/generate'

const colors = ['#46a3b0', '#fa541c', '#fa8c16', '#faad14', '#fadb14', '#a0d911', '#52c41a', '#13c2c2', '#1890ff', '#2f54eb', '#722ed1', '#eb2f96']

function App() {
  return <div className={palettesStyle}>
    {
      colors.map(primaryColor => <div className={paletteStyle} key={primaryColor}>
        {generate(primaryColor).map(color => <ColorBox key={color} color={color}/>)}
      </div>)
    }
  </div>
}

export default App
