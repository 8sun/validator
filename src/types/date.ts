import TypeValidator from '../typeValidator.js'

export default class DateValidator extends TypeValidator {
  nullable() {
    if (this.value === null) {
      this.isValid = true
      return this
    }
    return this
  }
}
