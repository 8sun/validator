import { test } from 'node:test'
import assert from 'node:assert'
import Validator from '../validator.js'

test('Should correctly validate an object', () => {
  assert.ok(!new Validator('string').isObject().check(), 'isObject returns true when wrong month')
  assert.ok(!new Validator('').isObject().check(), 'isObject returns true when empty')
  assert.ok(!new Validator(null).isObject().check(), 'isObject returns true when null')
  assert.ok(!new Validator(true).isObject().check(), 'isObject returns true when bool')
  assert.ok(!new Validator([]).isObject().check(), 'isObject returns true when an empty array')
  assert.ok(!new Validator([1]).isObject().check(), 'isObject returns true when not empty array')
  assert.ok(!new Validator(undefined).isObject().check(), 'isObject returns true when undefined')
  assert.ok(!new Validator(NaN).isObject().check(), 'isObject returns true when wrong when NaN')
  assert.ok(!new Validator({}).isObject().notEmpty().check(), 'isObject.notEmpty returns true when empty')
  assert.ok(!new Validator({ wrong: 1 }).isObject().notEmpty().contains('prop').check(), 'isObject.notEmpty.contains returns true when has no property')
  assert.ok(!new Validator({ wrong: 1 }).isObject().contains('prop').check(), 'isObject.contains returns true when has no property')

  assert.ok(new Validator({ prop: 1 }).isObject().contains('prop').check(), 'isObject.contains returns false when has property')
  assert.ok(new Validator({ prop: 1 }).isObject().notEmpty().contains('prop').check(), 'isObject.notEmpty.contains returns false when has property')
  assert.ok(new Validator({}).isObject().check(), 'isObject returns false when correct')
  assert.ok(new Validator({ a: 1 }).isObject().notEmpty().check(), 'isObject returns false when correct')
})
