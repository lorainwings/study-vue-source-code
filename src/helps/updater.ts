export const textUpdater = (node: HTMLElement, value: any) => {
  node.textContent = typeof value === "undefined" ? "" : value;
};

export const htmlUpdater = (node: HTMLElement, value: any) => {
  node.innerHTML = typeof value === "undefined" ? "" : value;
};

export const classUpdater = (node: HTMLElement, value: any, oldValue: any) => {
  let className = node.className;
  className = className.replace(oldValue, "").replace(/\s$/, "");

  let space = className && String(value) ? " " : "";

  node.className = className + space + value;
};

export const modelUpdater = (
  node: HTMLInputElement,
  value: any,
  oldValue: any
) => {
  if (oldValue !== value) node.value = typeof value === "undefined" ? "" : value;
};
