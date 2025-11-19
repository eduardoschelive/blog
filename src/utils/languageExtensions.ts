const languageExtensions: Record<string, string> = {
  typescript: 'ts',
  javascript: 'js',
}

function getFileExtension(lang?: string): string {
  return languageExtensions[lang?.toLowerCase() || ''] || 'txt'
}

export { languageExtensions, getFileExtension }
