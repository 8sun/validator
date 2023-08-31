import IntegerValidator from './integer.js'

export default class DecimalValidator extends IntegerValidator {
  declare value: number

  maxSize(precision: number, scale: number): DecimalValidator {
    if (!this.isValid) return this

    const decimalString = this.value.toString().replace('-', '')
    const decimalStringSplit = decimalString.split('.')

    if (decimalStringSplit.length === 2) {
      if (decimalString.length - 1 > precision) {
        this.isValid = false
        return this
      }
      this.isValid = decimalStringSplit[1].length <= scale
      return this
    }

    if (decimalString.length > precision) {
      this.isValid = false
      return this
    }

    return this
  }
}
