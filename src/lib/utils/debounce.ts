export function debouncer(delay: number, callback: () => void) {
  let timer: number;
  console.log("debouncing")
  return function () {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      callback();
      console.log("debounced")
    }, delay);
  };
}
