import { CDN_BASE_URL } from '@/constants/cdn'

/**
 * Cloudinary transformation parameters
 * @see https://cloudinary.com/documentation/image_transformation_reference
 */
export interface ImageTransformations {
  /** Width in pixels */
  w?: number
  /** Height in pixels */
  h?: number
  /** Crop/resize mode */
  c?:
    | 'scale'
    | 'fit'
    | 'limit'
    | 'mfit'
    | 'fill'
    | 'lfill'
    | 'pad'
    | 'lpad'
    | 'mpad'
    | 'crop'
    | 'thumb'
    | 'imagga_crop'
    | 'imagga_scale'
  /** Aspect ratio (e.g., "16:9", "4:3", "1:1") */
  ar?: string
  /** Gravity/focus area for cropping */
  g?:
    | 'auto'
    | 'face'
    | 'faces'
    | 'center'
    | 'north'
    | 'south'
    | 'east'
    | 'west'
    | 'north_east'
    | 'north_west'
    | 'south_east'
    | 'south_west'
  /** Quality (1-100, or "auto") */
  q?: number | 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low'
  /** Format */
  f?: 'auto' | 'jpg' | 'png' | 'webp' | 'avif' | 'gif' | 'svg'
  /** Device pixel ratio (1, 2, 3, etc.) */
  dpr?: number | 'auto'
  /** Radius (corner rounding) - number or "max" for circle */
  r?: number | 'max'
  /** Border - format: "width_style_color" (e.g., "5px_solid_red") */
  bo?: string
  /** Opacity (0-100) */
  o?: number
  /** Angle (rotation in degrees) */
  a?: number | 'auto_right' | 'auto_left' | 'ignore' | 'vflip' | 'hflip'
  /** Effects (e.g., "blur:300", "grayscale", "sharpen") */
  e?:
    | string
    | 'blur'
    | 'grayscale'
    | 'sepia'
    | 'pixelate'
    | 'oil_paint'
    | 'negate'
    | 'red'
    | 'green'
    | 'blue'
    | 'contrast'
    | 'vibrance'
    | 'brightness'
    | 'saturation'
    | 'hue'
    | 'sharpen'
    | 'unsharp_mask'
  /** Color space */
  cs?: 'srgb' | 'tinysrgb' | 'cmyk' | 'no_cmyk' | 'keep_cmyk'
  /** Color - for background, border, etc. */
  co?: string
  /** Background color (for padding, transparent areas) */
  b?: string
  /** Zoom (for face detection cropping) */
  z?: number
  /** X coordinate offset */
  x?: number
  /** Y coordinate offset */
  y?: number
  /** Flags (comma-separated) */
  fl?:
    | string
    | 'lossy'
    | 'progressive'
    | 'preserve_transparency'
    | 'png8'
    | 'immutable_cache'
    | 'relative'
}

/**
 * Builds a Cloudinary transformation string from parameters
 * @param transformations - Object with transformation parameters
 * @returns Transformation string (e.g., "w_800,h_600,c_fill,q_auto,f_auto")
 */
export function buildCloudinaryTransformations(
  transformations: ImageTransformations
): string {
  const params: string[] = []

  // Order matters for some transformations, so we process them in a logical order
  const orderedKeys: Array<keyof ImageTransformations> = [
    'w',
    'h',
    'ar',
    'c',
    'g',
    'x',
    'y',
    'z',
    'a',
    'r',
    'bo',
    'co',
    'b',
    'o',
    'e',
    'q',
    'f',
    'dpr',
    'cs',
    'fl',
  ]

  orderedKeys.forEach((key) => {
    const value = transformations[key]
    if (value !== undefined && value !== null) {
      params.push(`${key}_${value}`)
    }
  })

  return params.join(',')
}

/**
 * Generates a CDN URL with optional Cloudinary transformations
 * @param filename - Image filename (without /images/ prefix)
 * @param transformations - Optional Cloudinary transformations
 * @returns Full CDN URL with transformations
 * @example
 * getCDNImageUrl('profile') // https://cdn.eduardoschelive.com/images/profile
 * getCDNImageUrl('profile', { w: 800, h: 600, c: 'fill', f: 'webp' })
 * // https://cdn.eduardoschelive.com/images/w_800,h_600,c_fill,f_webp/profile
 */
export function getCDNImageUrl(
  filename: string,
  transformations?: ImageTransformations
): string {
  if (!transformations || Object.keys(transformations).length === 0) {
    return `${CDN_BASE_URL}/images/${filename}`
  }

  const transformString = buildCloudinaryTransformations(transformations)

  if (!transformString) {
    return `${CDN_BASE_URL}/images/${filename}`
  }

  return `${CDN_BASE_URL}/images/${transformString}/${filename}`
}
