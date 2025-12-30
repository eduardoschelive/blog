export abstract class ApplicationError extends Error {
  constructor(name: string, message: string, cause: unknown) {
    super(message)
    this.name = name
    this.cause = cause
  }
}
