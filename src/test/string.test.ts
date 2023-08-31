import { test } from 'node:test'
import assert from 'node:assert'
import Validator from '../validator.js'

test('Should correctly validate string', async () => {
  assert.ok(!new Validator(1).isString().check(), 'isString returns true when value is a number')
  assert.ok(!new Validator(NaN).isString().check(), 'isString returns true when value is NaN')
  assert.ok(!new Validator(undefined).isString().check(), 'isString returns true when value is undefined')
  assert.ok(!new Validator(null).isString().check(), 'isString returns true when value is null')
  assert.ok(!new Validator([]).isString().check(), 'isString returns true when value is an array')
  assert.ok(!new Validator({}).isString().check(), 'isString returns true when value is an object')

  assert.ok(new Validator('string').isString().check(), 'isString returns false when value is a string')
})

test('Should correctly validate string when it is empty', async () => {
  assert.ok(!new Validator('').isString().notEmpty().check(), 'isString.notEmpty returns true when value is an empty sting')
  assert.ok(new Validator(' ').isString().notEmpty().check(), 'isString.notEmpty returns false when value is not an empty sting')
})

test('Should correctly validate string when it is nullable', async () => {
  assert.ok(new Validator(null).isString().notEmpty().nullable().check(), 'isString.notEmpty.nullable returns false when value is null')
  assert.ok(new Validator(null).isString().nullable().check(), 'isString.nullable returns false when value is null')
  assert.ok(new Validator('text').isString().nullable().check(), 'isString.nullable returns false when value is a string')

  assert.ok(!new Validator(undefined).isString().nullable().check(), 'isString.nullable returns true when value is undefined')
  assert.ok(!new Validator(1).isString().nullable().check(), 'isString.nullable returns false when value is a number')
  assert.ok(!new Validator({}).isString().nullable().check(), 'isString.nullable returns false when value is an empty object')
  assert.ok(!new Validator('').isString().notEmpty().nullable().check(), 'isString.notEmpty.nullable returns true when value is empty string')
})

test('Should correctly validate string when use size', async () => {
  assert.ok(!new Validator('str').isString().hasSize(4).check(), 'isString.hasSize returns true when not correct')
  assert.ok(!new Validator('str').isString().hasSize(2).check(), 'isString.hasSize returns true when not correct')

  assert.ok(new Validator('str').isString().notEmpty().hasSize(3).check(), 'isString.hasSize returns false when correct')
})

test('Should correctly validate string when is less than', async () => {
  assert.ok(!new Validator('string').isString().notEmpty().hasSize(6).lessThan(6).check(), 'isString.lessThan returns true when not correct')
  assert.ok(new Validator('string').isString().lessThan(7).check(), 'isString.lessThan returns false when correct')
})

test('Should correctly validate string when is greater than', async () => {
  assert.ok(!new Validator('string').isString().notEmpty().hasSize(6).lessThan(7).greaterThan(6).check(), 'isString.greaterThan returns true when not correct')
  assert.ok(new Validator('string').isString().greaterThan(5).check(), 'isString.notLessThan returns false when correct')
})
