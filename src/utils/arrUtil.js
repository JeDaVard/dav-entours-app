export const createArrSkeleton = (count) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(i);
    }
    return arr;
}