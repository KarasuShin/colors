import { guard, parseToHsla, toHex } from 'color2k'

interface HslObject {
  h: number
  s: number
  l: number
}

type HslArray = [number, number, number]

const lightColorCount = 5
const darkColorCount = 4
const hueStep = 2
const saturationStepLight = 0.03
const saturationStepDark = 0.05
const lightnessStepLight = 0.07
const lightnessStepDark = 0.1

const getColorString = ({ h, s, l }: HslObject) => toHex(`hsl(${h}, ${s}%, ${l}%)`)

const getHue = (hsl: [number, number, number], i: number, light?: boolean) => {
  let hue: number
  const hueRounded = Math.round(hsl[0])
  if (hueRounded >= 60 && hueRounded <= 240) {
    hue = light ? hueRounded - hueStep * i : hueRounded + hueStep * i
  } else {
    hue = light ? hueRounded + hueStep * i : hueRounded - hueStep * i
  }
  if (hue < 0) {
    hue += 360
  } else if (hue >= 360) {
    hue -= 360
  }
  return hue
}

const getSaturation = ([hue, saturation]: HslArray, i: number, light?: boolean) => {
  if (hue === 0 && saturation === 0) {
    return saturation
  }
  let result: number
  if (light) {
    result = saturation - saturationStepLight * i
  } else if (i === darkColorCount) {
    result = saturation + saturationStepLight
  } else {
    result = saturation + saturationStepDark * i
  }
  return Number(guard(0, 100, result * 100).toFixed(2))
}

export const getLightness = ([,,lightness]: HslArray, i: number, light?: boolean) => {
  let result: number
  if (light) {
    result = lightness + lightnessStepLight * i
  } else {
    result = lightness - lightnessStepDark * i
  }
  if (result > 1) {
    result = 1
  }
  return Number(guard(0, 100, result * 100).toFixed(2))
}

export default function generate(color: string) {
  const patterns: string[] = []
  for (let i = lightColorCount; i > 0; i -= 1) {
    const hsl = parseToHsla(color).slice(0, 3) as HslArray
    const colorString: string = getColorString({
      h: getHue(hsl, i, true),
      s: getSaturation(hsl, i, true),
      l: getLightness(hsl, i, true),
    })
    patterns.push(colorString)
  }
  patterns.push(color)
  for (let i = 1; i <= darkColorCount; i += 1) {
    const hsl = parseToHsla(color).slice(0, 3) as HslArray
    const colorString: string = getColorString({
      h: getHue(hsl, i),
      s: getSaturation(hsl, i),
      l: getLightness(hsl, i),
    })
    patterns.push(colorString)
  }

  return patterns
}

export { lightColorCount }
