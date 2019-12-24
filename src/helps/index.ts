export const isObject = (): boolean => {
  return Object.prototype.toString.call(origin).slice(-7, -1);
};

export const isDirective = (attr: string): boolean => {
  return attr.indexOf("k-") === 0;
};

export const isEventDirective = (dir: string): boolean => {
  return dir.indexOf("@") === 0;
};

export const isElementNode = (node: ChildNode): boolean => {
  return node.nodeType === 1;
};

export const isTextNode = (node: ChildNode): boolean => {
  return node.nodeType === 3;
};

// 插值文本
export const isInterpolation = (node: ChildNode) => {
  return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
};
