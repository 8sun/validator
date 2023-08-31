import Validate from '../validate.js'

export default class StringValidator extends Validate {
  declare value: string

  notEmpty(): StringValidator {
    if (!this.isValid) return this
    this.isValid = this.value.length > 0
    return this
  }

  nullable(): { check: () => keyof Validate } | StringValidator {
    if (this.value === null) {
      this.isValid = true
      return this
    }
    return this
  }

  hasSize(size: number): StringValidator {
    if (!this.isValid) return this
    this.isValid = this.value.length === size
    return this
  }

  lessThan(size: number): StringValidator {
    if (!this.isValid) return this
    this.isValid = this.value.length < size
    return this
  }

  greaterThan(size: number): StringValidator {
    if (!this.isValid) return this
    this.isValid = this.value.length > size
    return this
  }
}
