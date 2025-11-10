import type { ReactNode } from 'react'

export interface GradientTextProps {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  gradient?: 'primary' | 'danger' | 'success' | 'secondary'
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
}

const gradients = {
  primary: 'bg-linear-to-r from-primary via-secondary to-primary',
  danger: 'bg-linear-to-r from-danger via-warning to-danger',
  success: 'bg-linear-to-r from-success via-primary to-success',
  secondary: 'bg-linear-to-r from-secondary via-primary to-secondary',
}

const sizes = {
  xs: 'text-xs md:text-sm',
  sm: 'text-sm md:text-base',
  base: 'text-base md:text-lg',
  lg: 'text-lg md:text-xl',
  xl: 'text-xl md:text-2xl',
  '2xl': 'text-2xl md:text-3xl',
  '3xl': 'text-3xl md:text-4xl',
  '4xl': 'text-4xl md:text-5xl',
  '5xl': 'text-5xl md:text-6xl',
  '6xl': 'text-6xl md:text-7xl',
  '7xl': 'text-7xl md:text-8xl',
  '8xl': 'text-8xl md:text-9xl',
  '9xl': 'text-9xl md:text-[10rem]',
}

const weights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
}

function GradientText({
  children,
  className = '',
  gradient = 'primary',
  size = 'base',
  weight = 'bold',
  as: Component = 'span',
}: GradientTextProps) {
  const classes =
    `bg-clip-text text-transparent animate-gradient bg-size-[200%_auto] ${gradients[gradient]} ${sizes[size]} ${weights[weight]} ${className}`.trim()

  return <Component className={classes}>{children}</Component>
}

export { GradientText }
