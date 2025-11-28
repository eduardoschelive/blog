export function getFileExtension(lang?: string): string {
  const extensions: Record<string, string> = {
    typescript: 'ts',
    javascript: 'js',
  }
  return extensions[lang?.toLowerCase() || ''] || 'txt'
}
