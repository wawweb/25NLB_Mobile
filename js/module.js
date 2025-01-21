// 移除事件
export const removeEv = (doms, className) => {
  if (doms instanceof NodeList || Array.isArray(doms)) {
    doms.forEach(dom => dom.classList.remove(className));
  } else {
    doms.classList.remove(className);
  }
};
// click + 移除事件
export const clickEv = (doms, className) => {
  doms.forEach(dom => {
    dom.addEventListener('click', () => {
      removeEv(doms, className);
      dom.classList.add(className);
    });
  });
};
