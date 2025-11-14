export const PERSONAL_INFO = {
  name: {
    full: 'Eduardo Guiraldelli Schelive',
    short: 'Eduardo Schelive',
    abbreviated: 'Eduardo G. Schelive',
  },
  social: {
    github: 'https://github.com/eduardoschelive',
    linkedin: 'https://linkedin.com/in/eduardoschelive',
  },
} as const

export type PersonalInfo = typeof PERSONAL_INFO
