export function debouncer(delay: number, callback: () => void) {
  let timer: number;
  return function () {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      callback();
    }, delay);
  };
}
