export function addClass(el, className) {
  if (!el.classList.contans(className)) {
    el.classList.add(className);
  }
}

export function removeClass(el, className) {
  el.classList.remove(className);
}
