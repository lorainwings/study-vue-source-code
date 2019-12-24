import { WatcherI, DependencyI } from "similar-vue";

export default class Dependency implements DependencyI {
  static target: any;
  public deps: Array<WatcherI> = [];
  // 在deps中添加一个监听器对象
  subscribe(dep: WatcherI) {
    this.deps.push(dep);
  }
  // 通知所有监听器去更新视图
  notify() {
    this.deps.forEach(dep => {
      dep.update();
    });
  }
}
