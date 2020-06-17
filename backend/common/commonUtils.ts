export default {
    isEmptyArray: (target: Array<any>) => {
        return Object.keys(target).length === 0;
    },

    isEmptyObject: (target: Object) => {
        return Object.keys(target).length === 0;
    },
};
