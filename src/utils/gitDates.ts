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

export async function getBatchGitFileDates(
  filePaths: string[]
): Promise<Map<string, GitDates>> {
  const results = new Map<string, GitDates>()

  if (filePaths.length === 0) {
    return results
  }

  try {
    const cwd = process.cwd()
    const relativePaths = filePaths.map((fp) => {
      const absolutePath = path.resolve(fp)
      return {
        absolute: absolutePath,
        relative: path.relative(cwd, absolutePath),
      }
    })

    const pathsArg = relativePaths.map((p) => `"${p.relative}"`).join(' ')

    const [creationOutput, modificationOutput] = await Promise.all([
      execAsync(
        `git log --follow --format="%ai %H" --name-only --diff-filter=A --reverse -- ${pathsArg}`,
        { cwd, maxBuffer: 1024 * 1024 * 10 }
      ),
      execAsync(
        `git log --follow --format="%ai %H" --name-only -1 -- ${pathsArg}`,
        { cwd, maxBuffer: 1024 * 1024 * 10 }
      ),
    ])

    const creationDates = parseGitLogOutput(
      creationOutput.stdout,
      relativePaths
    )
    const modificationDates = parseGitLogOutput(
      modificationOutput.stdout,
      relativePaths
    )

    for (const { absolute, relative } of relativePaths) {
      const created = creationDates.get(relative)
      const modified = modificationDates.get(relative)

      if (created && modified) {
        results.set(absolute, {
          createdAt: created,
          updatedAt: modified,
        })
      }
    }

    return results
  } catch (error) {
    console.warn(
      'Failed to get batch Git dates, falling back to individual queries:',
      error
    )

    const fallbackResults = await Promise.all(
      filePaths.map(async (filePath) => ({
        filePath,
        dates: await getGitFileDates(filePath),
      }))
    )

    for (const { filePath, dates } of fallbackResults) {
      if (dates) {
        results.set(path.resolve(filePath), dates)
      }
    }

    return results
  }
}

function parseGitLogOutput(
  output: string,
  pathsInfo: Array<{ absolute: string; relative: string }>
): Map<string, Date> {
  const results = new Map<string, Date>()
  const lines = output.trim().split('\n')

  let currentDate: Date | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const dateMatch = trimmed.match(
      /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [+-]\d{4})/
    )
    if (dateMatch) {
      currentDate = new Date(dateMatch[1])
      continue
    }

    if (currentDate) {
      const matchingPath = pathsInfo.find((p) => trimmed === p.relative)
      if (matchingPath && !results.has(matchingPath.relative)) {
        results.set(matchingPath.relative, currentDate)
      }
    }
  }

  return results
}
