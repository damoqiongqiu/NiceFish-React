const toggleClass = (bool:Boolean,fn:any,cl:string = '') => {
    if (bool) {
        fn(cl);
    }else{
        fn('');
    }
}
const fillClass = 'ui-state-filled';
export default {
    fillClass,
    toggleClass
}