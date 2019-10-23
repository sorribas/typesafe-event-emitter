import { EventEmitter } from 'events'

interface StringKeyedObject {
  [key: string]: any
}

export interface TypeSafeEventEmitter<C extends StringKeyedObject> extends EventEmitter {

  // K has to be a key on C (the passed type) but it also has to be a string and then we use index
  // types to get the actual type that we expect (C[K]).

  emit<K extends Extract<keyof C, string>>(k: K, v: C[K]): boolean 
  on<K extends Extract<keyof C, string>>(k: K, f:(v: C[K]) => void): this 
}
