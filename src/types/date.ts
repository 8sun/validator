import Validate from '../validate.js'

export default class DateValidator extends Validate {
  nullable() {
    if (this.value === null) {
      this.isValid = true
      return this
    }
    return this
  }
}
