import { CompileI } from "similar-vue";
import {
  isDirective,
  isEventDirective,
  isElementNode,
  isTextNode
} from "../helps/index";
import Watcher from "./watcher";
import Vue from "../helps/midmodule";

export default class Compile implements CompileI<Vue> {
  public $vm: Vue;
  public $el: HTMLElement;
  public $fragment: DocumentFragment;
  [propName: string]: any;

  constructor(el: string, vm: Vue) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el);
      this.compileElement(this.$fragment);
      this.$el.appendChild(this.$fragment);
    }
  }

  node2Fragment(el: HTMLElement) {
    // 新建文档碎片 dom接口

    let fragment = document.createDocumentFragment();
    let child;
    // 将原生节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compileElement(el: DocumentFragment | HTMLElement) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      let text = node.textContent;
      // 表达式文本
      // 就是识别{{}}中的数据
      let reg = /\{\{(.*)\}\}/;
      // 按元素节点方式编译
      if (isElementNode(node)) {
        // 元素
        // console.log('编译元素'+node.nodeName);
        // 查找k-，@，:
        const nodeAttrs = (<Element>node).attributes;
        Array.from(nodeAttrs).forEach(attr => {
          const attrName = attr.name; // 属性名
          const exp = attr.value; // 属性值
          if (isDirective(attrName)) {
            // k-text
            const dir = attrName.substring(2);
            // 执行指令
            this[dir] && this[dir](node, this.$vm, exp);
          }
          if (isEventDirective(attrName)) {
            const dir = attrName.substring(1); // @click
            this.eventHandler(node, this.$vm, exp, dir);
          }
        });
      } else if (isTextNode(node) && reg.test(text)) {
        // 文本 并且有{{}}
        this.compileText(node, RegExp.$1);
      }

      // 遍历编译子节点
      if (node.childNodes && node.childNodes.length) {
        this.compileElement(<HTMLElement>node);
      }
    });
  }

  compileText(node: ChildNode, exp: string) {
    this.text(node, this.$vm, exp);
  }

  text(node: ChildNode, vm: Vue, exp: string) {
    this.update(node, vm, exp, "text");
  }

  html(node: ChildNode, vm: Vue, exp: string) {
    this.update(node, vm, exp, "html");
  }

  model(node: ChildNode, vm: Vue, exp: string) {
    this.update(node, vm, exp, "model");

    node.addEventListener("input", e => {
      let newValue = (<HTMLInputElement>e.target).value;
      vm[exp] = newValue;
    });
  }
  update(node: ChildNode, vm: Vue, exp: string, dir: string) {
    let updaterFn = this[dir + "Updater"];
    updaterFn(node, vm[exp]);
    new Watcher(vm, exp, (value: Vue) => {
      updaterFn(node, value);
    });
  }
  // 事件处理
  eventHandler(node: ChildNode, vm: Vue, exp: string, dir: string) {
    let fn = vm.$options.methods && vm.$options.methods[exp];
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm), false);
    }
  }

  textUpdater(node: ChildNode, value: any) {
    node.textContent = value;
  }

  htmlUpdater(node: HTMLElement, value: any) {
    node.innerHTML = value;
  }
  // 入口文件
  modelUpdater(node: HTMLInputElement, value: any) {
    node.value = value;
  }
}
