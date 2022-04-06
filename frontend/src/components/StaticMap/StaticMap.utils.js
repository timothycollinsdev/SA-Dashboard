export const getHeight = (square, width, mapHeight) => (square ? width : mapHeight || width * 0.6)

export const generateSize = (ref, square, mapHeight) => {
  const newWidth = ref.current?.clientWidth || 0
  return {
    width: newWidth,
    height: getHeight(square, newWidth, mapHeight),
  }
}

export const scaleRatio = 0.55

export const getScaleTranslation = (pathGenerator, location, width, height) => {
  const b = pathGenerator.bounds(location)
  const s = scaleRatio / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height)
  const t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2]
  return [s, t]
}
