# typesafe-event-emitter

TypeScript type declarations to make event emitters more type safe.

## The problem

TypeScript can be pretty useful for adding static type checking to JavaScript projects.
However, this is limited in several different areas. One of them is node.js event emitters.
If you write the following code in typescript.

```typescript
import { EventEmitter } from 'events'

type User = {
  name: string
  email: string
}

function makeSomeEventEmitter() {
  const em: EventEmitter = new EventEmitter()

  // at some point later
  em.emit('new-user', {name: 'Ed', email: 'ed@example.com'})

  return em;
}

// consumer
const someEventEmitter = makeSomeEventEmitter()

someEventEmitter.on('new-user', function(newUser) {
  console.log(newUser.name)
})
```

This will, work, but it isn't type safe in many ways. If you for example mistype the event
name in either the `emit` or the `on` function calls, this code would break without the
compiler alerting you, but most importantly, they payload of the event is never type checked
either on the `emit` call or on the function passed to the `on` function. In fact the `newUser`
variable in this code example, is of implicit type `any` since the compiler cannot tell what
type the payload of any event is.

## The solution

With this type declaration you can add type safety to your event emitters. The first step is to create a type
with this structure

```typescript
type Events = {
  'some-event': TypeOfThatEventsPayload
  'some-other-event': TypeOfThatOtherEventsPayload
}
```

and then create your event emitter with the following type signature on it.

```typescript
const em: TypeSafeEventEmitter<Events> = new EventEmitter()
```

and that's it. The compiler will now tell you if you call `emit` with a wrong event name or with a correct
event name, but the wrong type for the payload of that event. We could rewrite the first example like this.


```typescript
import { EventEmitter } from 'events'
import { TypeSafeEventEmitter } from 'typesafe-event-emitter'

type User = {
  name: string
  email: string
}

type Events = {
  'new-user': User
}

function makeSomeEventEmitter() {
  const em: TypeSafeEventEmitter<Events> = new EventEmitter()

  // at some point later
  em.emit('new-user', {name: 'Ed', email: 'ed@example.com'})

  return em;
}

// consumer
const someEventEmitter = makeSomeEventEmitter()

someEventEmitter.on('new-user', function(newUser) {
  console.log(newUser.name)
})
```

and now the compiler will alert us if we make any type errors emitting events, or listening for them,
and the `newUser` variable is now correctly inferred to be of type `User`

## License

MIT License

Copyright 2019 Eduardo Sorribas

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
