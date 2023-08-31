export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export default abstract class Validate {
  protected value: unknown
  protected isValid: boolean

  constructor(value: unknown, isValid: boolean) {
    this.value = value
    this.isValid = isValid
  }

  check() {
    if (this.isValid === undefined) throw new ValidationError('What to check?')
    return this.isValid
  }
}
