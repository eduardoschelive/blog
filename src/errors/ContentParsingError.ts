import { ApplicationError } from './ApplicationError'

export class ContentParsingError extends ApplicationError {
  constructor(message: string, cause?: unknown) {
    super('CONTENT_PARSING_ERROR', message, cause)
  }
}
