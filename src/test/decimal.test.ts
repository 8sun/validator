import { test } from 'node:test'
import assert from 'node:assert'
import Validator from '../validator.js'

test('Should correctly validate decimal', () => {
  assert.ok(!new Validator('1,33').isDecimal().check(), 'isDecimal returns true when value is decimal with comma in string')
  assert.ok(!new Validator('string').isDecimal().check(), 'isDecimal returns true when value is string')
  assert.ok(!new Validator([]).isDecimal().check(), 'isDecimal returns true when value is array')
  assert.ok(!new Validator({}).isDecimal().check(), 'isDecimal returns true when value is object')
  assert.ok(!new Validator(NaN).isDecimal().check(), 'isDecimal returns true when value is NaN')
  assert.ok(!new Validator(undefined).isDecimal().check(), 'isDecimal returns true when value is undefined')
  assert.ok(!new Validator(null).isDecimal().check(), 'isDecimal returns true when value is null')
  assert.ok(!new Validator(true).isDecimal().check(), 'isDecimal returns true when value is true')

  assert.ok(!new Validator('2.120').isDecimal().check(), 'isDecimal returns true when value is decimal in string')
  assert.ok(!new Validator('-2.120').isDecimal().check(), 'isDecimal returns true when value is negative decimal in string')
  assert.ok(new Validator(-2.34).isDecimal().check(), 'isDecimal returns false when value is decimal')
})

test('Should correctly validate decimal maxSize', () => {
  assert.ok(!new Validator(0.11).isDecimal().maxSize(2, 1).check(), 'isDecimal.maxSize returns true when wrong precision')
  assert.ok(!new Validator(11.1).isDecimal().maxSize(2, 1).check(), 'isDecimal.maxSize returns true when wrong precision')
  assert.ok(!new Validator(11.12).isDecimal().maxSize(3, 1).check(), 'isDecimal.maxSize returns true when wrong scale')
  assert.ok(!new Validator(11.12).isDecimal().maxSize(4, 1).check(), 'isDecimal.maxSize returns true when wrong scale')
  assert.ok(!new Validator(11.12).isDecimal().maxSize(4, 1).check(), 'isDecimal.maxSize returns true when wrong scale')
  assert.ok(!new Validator(12345).isDecimal().maxSize(4, 1).check(), 'isDecimal.maxSize (4,1) returns true when value is 12345')
  assert.ok(!new Validator(100.3001).isDecimal().maxSize(4, 1).check(), 'isDecimal.maxSize (4,1) returns true when value is 100.3001')

  assert.ok(new Validator(2.1201).isDecimal().maxSize(5, 4).check(), 'isDecimal.maxSize returns false when value is string')
  assert.ok(new Validator(-200.1).isDecimal().maxSize(4, 1).check(), 'isDecimal.maxSize returns false when value is negative decimal in string')
  assert.ok(new Validator(-2.34).isDecimal().maxSize(3, 2).check(), 'isDecimal.maxSize returns false when value is decimal')
  assert.ok(new Validator(17).isDecimal().maxSize(2, 0).check(), 'isDecimal.maxSize returns false when value is int')
  assert.ok(new Validator(4).isDecimal().maxSize(2, 0).check(), 'isDecimal.maxSize returns false when value is decimal')
})

test('Should correctly validate decimal when nullable', () => {
  assert.ok(!new Validator('a').isDecimal().nullable().check(), 'isDecimal.nullable returns true when incorrect')

  assert.ok(new Validator(0).isDecimal().nullable().check(), 'isDecimal.nullable returns false when 0')
  assert.ok(new Validator(1.01).isDecimal().nullable().unsigned().check(), 'isDecimal.nullable returns false when 1.01')
  assert.ok(new Validator(null).isDecimal().nullable().unsigned().check(), 'isDecimal.nullable returns false when null')
})
