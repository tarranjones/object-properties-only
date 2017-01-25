# Remove methods

## Before

```
{ str: 'str',
  fnc: { [Function] a: 'a' },
  arr: [ { [Function] function_prop: 'fp' }, [], {}, 'a', 1, null ],
  plainobj:
   { fn: [Function: fn],
     arr: [ [Function], [], {}, 'a', 1, null ] },
  dataDescriptor1: 'dataDescriptor1',
  accessorDescriptor1: [Getter] }
```

## After

```
{ str: 'str',
  fnc: { a: 'a' },
  arr: [ { function_prop: 'fp' }, [], {}, 'a', 1, null ],
  plainobj: { fn: {}, arr: [ {}, [], {}, 'a', 1, null ] },
  dataDescriptor1: 'dataDescriptor1',
  accessorDescriptor1: 'accessorDescriptor1' }
```

- Replaces all methods/functions with objects.
- Removes all methods inherited from Object (Object.prototype....)
