import { DataI, OptionsI, VueI } from "similar-vue";
import Compile from "./core/compile";
import Dependency from "./core/dependency";

export default class Vue implements VueI {
  public $options: OptionsI;
  public $data: DataI;
  public $compile: Compile;
  [propName: string]: any;

  protected constructor(options: OptionsI) {
    this.$options = options;
    this.$data = options.data;
    this.observer(this.$data);

    if (options.created) {
      options.created.call(this);
    }
    this.$compile = new Compile(options.el, this);
  }

  public observer(data: DataI) {
    console.log(data);
    if (
      data &&
      Object.prototype.toString.call(data).slice(-7, -1) === "Object"
    ) {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
        //   代理data中的属性到vue实例上
        this.proxyData(key);
      });
    }
  }

  public defineReactive(obj: DataI, key: string, value: any) {
    console.log(obj, key, value);
    const depItem = new Dependency();
    Reflect.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dependency.target && depItem.subscribe(Dependency.target);
        return value;
      },
      set(newVal) {
        if (newVal === value) return;
        value = newVal;
        depItem.notify();
      }
    });
  }

  public proxyData(key: string) {
    console.log(key);
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    });
  }
}
