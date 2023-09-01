import TypeValidator from '../typeValidator.js'

export default class IntegerValidator extends TypeValidator {
  declare value: number

  inRange(from: number, to: number): IntegerValidator {
    if (!this.isValid) return this
    this.isValid = this.value >= from && this.value <= to
    return this
  }

  notZero(): IntegerValidator {
    if (!this.isValid) return this
    this.isValid = this.value !== 0
    return this
  }

  unsigned(): IntegerValidator {
    if (!this.isValid) return this
    this.isValid = this.value >= 0
    return this
  }

  nullable() {
    if (this.value === null) {
      this.isValid = true
      return this
    }
    return this
  }
}
