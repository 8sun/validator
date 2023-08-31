8sun / validator
=============

A simple and efficient data type validator that provides a user-friendly call chain interface.

Example: 
```
    assert.ok(new Validator(1).isInt().inRange(1, 2).check())
    assert.ok(new Validator(null).isString().notEmpty().nullable().check())
```

Supported types: 
- integer
- decimal
- date
- object
- string
- array
