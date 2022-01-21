import { EventEmitter } from 'events'

interface StringKeyedObject {
  [key: string]: any
}

export interface TypeSafeEventEmitter<C extends StringKeyedObject> extends EventEmitter {
  // K has to be a key on C (the passed type) but it also has to be a string and then we use index
  // types to get the actual type that we expect (C[K]).

  addListener<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this
  on<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this
  once<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this
  removeListener<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this
  off<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this
  removeAllListeners<K extends Extract<keyof C, string>>(eventName?: K): this
  setMaxListeners(n: number): this
  getMaxListeners(): number
  listeners<K extends Extract<keyof C, string>>(eventName: K): Function[]
  rawListeners<K extends Extract<keyof C, string>>(eventName: K): Function[]
  emit<K extends Extract<keyof C, string>>(eventName: K, arg: C[K]): boolean
  listenerCount<K extends Extract<keyof C, string>>(eventName: K): number
  prependListener<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this
  prependOnceListener<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this
}
