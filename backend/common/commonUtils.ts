const isEmptyArray = (target: Array<any>) => {
    return Object.keys(target).length === 0;
};

const isEmptyObject = (target: Object) => {
    return Object.keys(target).length === 0;
};

export default { isEmptyArray, isEmptyObject };
