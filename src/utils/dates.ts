/**
 * Calculate age from birthdate
 * @param birthdate ISO format date string (YYYY-MM-DD)
 * @returns Current age in years
 */
export function calculateAge(birthdate: string): number {
  const birth = new Date(birthdate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

/**
 * Calculate years since a given year
 * @param year Starting year
 * @returns Number of years elapsed since the given year
 */
export function calculateYearsSince(year: number): number {
  return new Date().getFullYear() - year
}
