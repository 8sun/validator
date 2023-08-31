import Validate from '../validate.js'

export default class ArrayValidator extends Validate {
  declare value: unknown[]
  notEmpty(): ArrayValidator {
    if (!this.isValid) return this
    this.isValid = this.value.length > 0
    return this
  }
}
