import { execSync } from 'node:child_process'
import path from 'node:path'

interface GitDates {
  createdAt: Date
  updatedAt: Date
}

export function getGitFileDates(filePath: string): GitDates | null {
  try {
    const absolutePath = path.resolve(filePath)
    const relativePath = path.relative(process.cwd(), absolutePath)

    const creationCommand = `git log --follow --format="%ai" --reverse -- "${relativePath}" | head -1`
    const creationDateStr = execSync(creationCommand, {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim()

    const modificationCommand = `git log --follow --format="%ai" -1 -- "${relativePath}"`
    const modificationDateStr = execSync(modificationCommand, {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim()

    if (!creationDateStr || !modificationDateStr) {
      return null
    }

    return {
      createdAt: new Date(creationDateStr),
      updatedAt: new Date(modificationDateStr),
    }
  } catch (error) {
    console.warn(`Failed to get Git dates for ${filePath}:`, error)
    return null
  }
}

export function getFileCommitHistory(filePath: string): Array<{
  hash: string
  date: Date
  message: string
  author: string
}> {
  try {
    const absolutePath = path.resolve(filePath)
    const relativePath = path.relative(process.cwd(), absolutePath)

    const command = `git log --follow --format="%H|%ai|%s|%an" -- "${relativePath}"`
    const output = execSync(command, {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim()

    if (!output) {
      return []
    }

    return output.split('\n').map((line) => {
      const [hash, dateStr, message, author] = line.split('|')
      return {
        hash,
        date: new Date(dateStr),
        message,
        author,
      }
    })
  } catch (error) {
    console.warn(`Failed to get commit history for ${filePath}:`, error)
    return []
  }
}

export function isFileTrackedByGit(filePath: string): boolean {
  try {
    const absolutePath = path.resolve(filePath)
    const relativePath = path.relative(process.cwd(), absolutePath)

    execSync(`git ls-files --error-unmatch "${relativePath}"`, {
      encoding: 'utf8',
      cwd: process.cwd(),
      stdio: 'pipe',
    })

    return true
  } catch {
    return false
  }
}

export function getFileCreationDate(filePath: string): Date | null {
  const dates = getGitFileDates(filePath)
  return dates?.createdAt || null
}

export function getFileLastModifiedDate(filePath: string): Date | null {
  const dates = getGitFileDates(filePath)
  return dates?.updatedAt || null
}
