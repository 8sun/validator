import { test } from 'node:test'
import assert from 'node:assert'
import Validator from '../validator.js'

test('Should correctly validate an integer', () => {
  assert.ok(!new Validator('s').isInt().check(), 'isInt returns true when value is a string')
  assert.ok(!new Validator(null).isInt().check(), 'isInt returns true when value is null')
  assert.ok(!new Validator(false).isInt().check(), 'isInt returns true when value is false')
  assert.ok(!new Validator(true).isInt().check(), 'isInt returns true when value is false')
  assert.ok(!new Validator(undefined).isInt().check(), 'isInt returns true when value is undefined')
  assert.ok(!new Validator(NaN).isInt().check(), 'isInt returns true when value is NaN')
  assert.ok(!new Validator([]).isInt().check(), 'isInt returns true when value is an array')
  assert.ok(!new Validator({}).isInt().check(), 'isInt returns true when value is an object')
  assert.ok(!new Validator(-1).isInt().unsigned().check(), 'isInt returns true when value is a negative number')
  assert.ok(!new Validator(1.2).isInt().check(), 'isInt returns true when value is a decimal')

  assert.ok(new Validator(0).isInt().check(), 'isInt returns false when value is zero')
  assert.ok(new Validator(-2).isInt().check(), 'isInt returns false when value is less than zero')
  assert.ok(new Validator(1).isInt().check(), 'isInt returns false when value is a number')
  assert.ok(new Validator(9999).isInt().check(), 'isInt returns false when value is a number')
})

test('Should correctly validate integer in range', () => {
  assert.ok(!new Validator(2).isInt().inRange(0, 1).check(), 'returns true when inRange(0,1) for value 2')
  assert.ok(!new Validator(99).isInt().inRange(1, 98).check(), 'returns true when inRange(1,98) for value 99')

  assert.ok(new Validator(1).isInt().inRange(1, 2).check(), 'returns false when inRange(1,2) for value 1')
  assert.ok(new Validator(2).isInt().inRange(1, 2).check(), 'returns false when inRange(1,2) for value 2')
  assert.ok(new Validator(0).isInt().inRange(0, 1).check(), 'returns false when inRange(0, 1) for value 0')
  assert.ok(new Validator(0).isInt().inRange(0, 0).check(), 'returns false when inRange(0,0) for value 0')
})

test('Should correctly validate integer when zero and unsigned', () => {
  assert.ok(!new Validator(0).isInt().notZero().check(), 'returns true when notZero for value 0')
  assert.ok(!new Validator(0).isInt().notZero().unsigned().check(), 'returns true when notZero and unsigned for value 0')
  assert.ok(!new Validator(-1).isInt().unsigned().check(), 'returns true when unsigned for value -1')

  assert.ok(new Validator(1).isInt().notZero().check(), 'returns false when notZero for value 1')
  assert.ok(new Validator(1).isInt().notZero().unsigned().check(), 'returns false when unsigned for value 1')
})

test('Should correctly validate integer when nullable', () => {
  assert.ok(!new Validator('a').isInt().nullable().check(), 'isInt.nullable returns true when incorrect')

  assert.ok(new Validator(0).isInt().nullable().check(), 'isInt.nullable returns false when 0')
  assert.ok(new Validator(1).isInt().nullable().unsigned().check(), 'isInt.nullable returns false when 1')
  assert.ok(new Validator(null).isInt().nullable().unsigned().check(), 'isInt.nullable returns false when null')
})
