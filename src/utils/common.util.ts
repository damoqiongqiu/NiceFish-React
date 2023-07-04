const toggleClass = (bool: Boolean, fn: Function, cl: string = ''): void => {
  if (bool) {
    fn(cl);
  } else {
    fn('');
  }
};
const fillClass = 'ui-state-filled';
export default {
  fillClass,
  toggleClass
};
