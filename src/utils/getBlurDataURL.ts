export function getBlurDataURL(width: number, height: number): string {
  const blurColor = '#2a2d3a'

  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><filter id="b"><feGaussianBlur stdDeviation="20"/></filter><rect width="100%" height="100%" fill="${blurColor}" filter="url(#b)"/></svg>`
  ).toString('base64')}`
}
