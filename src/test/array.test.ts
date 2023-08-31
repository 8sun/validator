import { test } from 'node:test'
import assert from 'node:assert'
import Validator from '../validator.js'

test('Should correctly validate an array', async () => {
  assert.ok(!new Validator('string').isArray().check(), 'isArray returns true when wrong month')
  assert.ok(!new Validator('').isArray().check(), 'isArray returns true when empty')
  assert.ok(!new Validator(null).isArray().check(), 'isArray returns true when null')
  assert.ok(!new Validator(true).isArray().check(), 'isArray returns true when bool')
  assert.ok(!new Validator({}).isArray().check(), 'isArray returns true when an object')
  assert.ok(!new Validator(undefined).isArray().check(), 'isArray returns true when undefined')
  assert.ok(!new Validator(NaN).isArray().check(), 'isArray returns true when wrong when NaN')
  assert.ok(!new Validator([]).isArray().notEmpty().check(), 'isArray.notEmpty returns true when empty')

  assert.ok(new Validator([]).isArray().check(), 'isArray returns false when correct')
  assert.ok(new Validator([1]).isArray().notEmpty().check(), 'isArray.notEmpty returns false when not empty')
})
