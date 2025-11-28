import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'

const execAsync = promisify(exec)

export interface GitDates {
  createdAt: Date
  updatedAt: Date
}

export async function getGitFileDates(
  filePath: string
): Promise<GitDates | null> {
  try {
    const absolutePath = path.resolve(filePath)
    const relativePath = path.relative(process.cwd(), absolutePath)

    const [creationResult, modificationResult] = await Promise.all([
      execAsync(
        `git log --follow --format="%ai" --reverse -- "${relativePath}" | head -1`,
        { cwd: process.cwd() }
      ),
      execAsync(`git log --follow --format="%ai" -1 -- "${relativePath}"`, {
        cwd: process.cwd(),
      }),
    ])

    const creationDateStr = creationResult.stdout.trim()
    const modificationDateStr = modificationResult.stdout.trim()

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
