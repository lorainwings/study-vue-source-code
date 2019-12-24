interface DataI {
  [index: string]: any;
}

interface OptionsI {
  el: string;
  data: DataI;
  created(): void;
  methods: {
    [index: string]: () => void;
  };
}

interface WatcherI {
  update(): void;
}

interface DependencyI {
  subscribe(dep: WatcherI): void;
  notify(): void;
}

interface CompileI<T> {
  $vm: T;
  $el: HTMLElement;
  $fragment: DocumentFragment;
  [propName: string]: any;
}

interface VueI {
  $options: OptionsI;
  $data: DataI;
  [propName: string]: any;
  defineReactive(obj: object, key: string, value: string): void;
  observer(data: DataI): void;
  proxyData(key: string): void;
}

export { DataI, OptionsI, WatcherI, DependencyI, CompileI, VueI };
