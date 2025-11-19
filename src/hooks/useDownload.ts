'use client'

import { useCallback } from 'react'

interface DownloadOptions {
  filename: string
  mimeType?: string
}

function useDownload() {
  const download = useCallback((content: string, options: DownloadOptions) => {
    const { filename, mimeType = 'text/plain' } = options

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [])

  return { download }
}

export { useDownload }
