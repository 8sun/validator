import IntegerValidator from './types/integer.js'
import DecimalValidator from './types/decimal.js'
import ArrayValidator from './types/array.js'
import StringValidator from './types/string.js'
import DateValidator from './types/date.js'
import ObjectValidator from './types/object.js'

export default class Validator {
  private readonly value: unknown

  constructor(value: unknown) {
    this.value = value
  }

  isInt(): IntegerValidator {
    if (typeof this.value !== 'number') {
      return new IntegerValidator(this.value, false)
    }

    const isValid = !isNaN(this.value) && this.value % 1 === 0
    return new IntegerValidator(this.value, isValid)
  }

  isString(): StringValidator {
    const isValid = typeof this.value === 'string'
    return new StringValidator(this.value, isValid)
  }

  isDecimal(): DecimalValidator {
    if (typeof this.value !== 'number') {
      return new DecimalValidator(this.value, false)
    }

    const value = Number(this.value)
    const isValid = !isNaN(parseFloat(value + '')) && isFinite(value)
    return new DecimalValidator(value, isValid)
  }

  isDate(): DateValidator {
    const isValid = this.value instanceof Date
    return new DateValidator(this.value, isValid)
  }

  isDateString(): DateValidator {
    if (typeof this.value !== 'string') {
      return new DateValidator(this.value, false)
    }
    const isValid = /^\d{4}-\d{2}-\d{2}$/.test(this.value) && !isNaN(new Date(this.value).getDate())
    return new DateValidator(this.value, isValid)
  }

  isDateTimeString(): DateValidator {
    if (typeof this.value !== 'string') {
      return new DateValidator(this.value, false)
    }
    const isValid = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z?)$/.test(this.value) && !isNaN(new Date(this.value).getDate())
    return new DateValidator(this.value, isValid)
  }

  isArray(): ArrayValidator {
    const isValid = Array.isArray(this.value)
    return new ArrayValidator(this.value, isValid)
  }

  isObject(): ObjectValidator {
    const isValid = Object.prototype.toString.call(this.value) === '[object Object]'
    return new ObjectValidator(this.value, isValid)
  }
}
