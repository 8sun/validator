import { test } from 'node:test'
import assert from 'node:assert'
import Validator from '../validator.js'

test('Should correctly validate date', async () => {
  assert.ok(!new Validator('2022-12-12').isDate().check(), 'isDate returns true when wrong month')
  assert.ok(!new Validator('2022-1-12').isDate().check(), 'isDate returns true when wrong month')
  assert.ok(!new Validator('').isDate().check(), 'isDate returns true when empty')
  assert.ok(!new Validator(null).isDate().check(), 'isDate returns true when null')
  assert.ok(!new Validator(true).isDate().check(), 'isDate returns true when bool')
  assert.ok(!new Validator([]).isDate().check(), 'isDate returns true when an array')
  assert.ok(!new Validator({}).isDate().check(), 'isDate returns true when an object')
  assert.ok(!new Validator(undefined).isDate().check(), 'isDate returns true when undefined')
  assert.ok(!new Validator(NaN).isDate().check(), 'isDate returns true when wrong when NaN')

  assert.ok(new Validator(new Date('2000-01-01')).isDate().check(), 'isDate returns false when correct')
  assert.ok(new Validator(new Date()).isDate().check(), 'isDate returns false when correct')
})

test('Should correctly validate date when nullable', () => {
  assert.ok(new Validator(new Date('2022-12-12T12:00:00')).isDate().nullable().check(), 'isDate.nullable returns true when not null')
  assert.ok(new Validator(new Date('2022-12-12')).isDate().nullable().check(), 'isDate.nullable returns true when date is correct')
  assert.ok(new Validator(null).isDate().nullable().check(), 'isDate.nullable returns false when null')
})

test('Should correctly validate date string', async () => {
  assert.ok(!new Validator('2022-123-12').isDateString().check(), 'isDateString returns true when wrong month')
  assert.ok(!new Validator('2022-1-12').isDateString().check(), 'isDateString returns true when wrong month')
  assert.ok(!new Validator('2022-01-123').isDateString().check(), 'isDateString returns true when wrong day')
  assert.ok(!new Validator('2022-20-1').isDateString().check(), 'isDateString returns true when wrong day')
  assert.ok(!new Validator('99990-01-01').isDateString().check(), 'isDateString returns true when wrong year')
  assert.ok(!new Validator('').isDateString().check(), 'isDateString returns true when empty')
  assert.ok(!new Validator(null).isDateString().check(), 'isDateString returns true when null')
  assert.ok(!new Validator(true).isDateString().check(), 'isDateString returns true when bool')
  assert.ok(!new Validator([]).isDateString().check(), 'isDateString returns true when an array')
  assert.ok(!new Validator({}).isDateString().check(), 'isDateString returns true when an object')
  assert.ok(!new Validator(undefined).isDateString().check(), 'isDateString returns true when undefined')
  assert.ok(!new Validator(NaN).isDateString().check(), 'isDateString returns true when wrong when NaN')

  assert.ok(new Validator('2000-01-01').isDateString().check(), 'isDateString returns false when correct')
  assert.ok(new Validator('2022-12-12').isDateString().check(), 'isDateString returns false when correct')
})

test('Should correctly validate date string when nullable', async () => {
  assert.ok(new Validator('2022-12-12').isDateString().nullable().check(), 'isDateString.nullable returns true when date is correct')
  assert.ok(new Validator(null).isDateString().nullable().check(), 'isDateString.nullable returns false when null')
})

test('Should correctly validate date-time string', async () => {
  assert.ok(!new Validator('2022-123-12').isDateTimeString().check(), 'isDateTimeString returns true when wrong month')
  assert.ok(!new Validator('2022-1-12').isDateTimeString().check(), 'isDateTimeString returns true when wrong month')
  assert.ok(!new Validator('2022-01-123').isDateTimeString().check(), 'isDateTimeString returns true when wrong day')
  assert.ok(!new Validator('2022-20-1').isDateTimeString().check(), 'isDateTimeString returns true when wrong day')
  assert.ok(!new Validator('99990-01-01').isDateTimeString().check(), 'isDateTimeString returns true when wrong year')
  assert.ok(!new Validator('2022-12-01T1:02:20').isDateTimeString().check(), 'isDateTimeString returns true when wrong hours')
  assert.ok(!new Validator('2022-12-01T01:2:20').isDateTimeString().check(), 'isDateTimeString returns true when wrong minutes')
  assert.ok(!new Validator('2022-12-01T01:02:2').isDateTimeString().check(), 'isDateTimeString returns true when wrong seconds')
  assert.ok(!new Validator('').isDateTimeString().check(), 'isDateTimeString returns true when empty')
  assert.ok(!new Validator(null).isDateTimeString().check(), 'isDateTimeString returns true when null')
  assert.ok(!new Validator(true).isDateTimeString().check(), 'isDateTimeString returns true when bool')
  assert.ok(!new Validator([]).isDateTimeString().check(), 'isDateTimeString returns true when an array')
  assert.ok(!new Validator({}).isDateTimeString().check(), 'isDateTimeString returns true when an object')
  assert.ok(!new Validator(undefined).isDateTimeString().check(), 'isDateTimeString returns true when undefined')
  assert.ok(!new Validator(NaN).isDateTimeString().check(), 'isDateTimeString returns true when wrong when NaN')

  assert.ok(new Validator('2000-01-01T12:12:12Z').isDateTimeString().check(), 'isDateTimeString returns false when correct')
  assert.ok(new Validator('2022-12-12T00:00:00').isDateTimeString().check(), 'isDateTimeString returns false when correct')
})

test('Should correctly validate date-time string when nullable', async () => {
  assert.ok(!new Validator('2022-12-12').isDateTimeString().nullable().check(), 'isDateTimeString.nullable returns true when not null')

  assert.ok(new Validator('2022-12-12T12:00:00').isDateTimeString().nullable().check(), 'isDateTimeString.nullable returns true when date is correct')
  assert.ok(new Validator(null).isDateTimeString().nullable().check(), 'isDateTimeString.nullable returns false when null')
})
