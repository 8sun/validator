import Validate from '../validate.js'

export default class ObjectValidator extends Validate {
  declare value: object

  notEmpty(): ObjectValidator {
    if (!this.isValid) return this
    this.isValid = Object.getOwnPropertyNames(this.value).length > 0
    return this
  }

  contains(property: string): ObjectValidator {
    if (!this.isValid) return this
    this.isValid = property in this.value
    return this
  }
}
