type Unsubscriber = () => void;

export default interface Notifier<T> {
      subscribe: ( callback: ( value: T ) => void ) => Unsubscriber;
}

export type Node<T> = {
      value: T,
      next: Node<T>
}