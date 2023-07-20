const toggleClass = (bool, fn, cl = '') => {
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
