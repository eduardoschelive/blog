export const PERSONAL_INFO = {
  name: {
    full: 'Eduardo Guiraldelli Schelive',
    short: 'Eduardo Schelive',
    abbreviated: 'Eduardo G. Schelive',
  },
  birthdate: '2003-10-22',
  careerStart: 2013,
  social: {
    github: 'https://github.com/eduardoschelive',
    linkedin: 'https://linkedin.com/in/eduardoschelive',
    email: 'contact@eduardoschelive.com',
  },
  links: {
    skript: 'https://github.com/SkriptLang/Skript',
  },
} as const

export type PersonalInfo = typeof PERSONAL_INFO
