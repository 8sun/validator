import TypeValidator from '../typeValidator.js'

export default class ArrayValidator extends TypeValidator {
  declare value: unknown[]
  notEmpty(): ArrayValidator {
    if (!this.isValid) return this
    this.isValid = this.value.length > 0
    return this
  }
}
