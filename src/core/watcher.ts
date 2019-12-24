import { WatcherI } from "similar-vue";
import Dep from "./dependency";
import Vue from "../helps/midmodule";

export default class Watcher implements WatcherI {
  public vm: {
    [index: string]: any;
  };
  public key: string;
  public cb: Function;

  constructor(vm: Vue, key: string, cb: Function) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    // 将当前watcher实例指定到Dep静态属性target
    Dep.target = this;
    this.vm[this.key]; // 触发getter，添加依赖
    Dep.target = null;
  }

  update() {
    // console.log("属性更新了");
    this.cb.call(this.vm, this.vm[this.key]);
  }
}
