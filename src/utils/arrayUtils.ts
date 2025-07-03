export const isArraysEqual = <T>(arr1: T[], arr2: T[]): boolean => {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;

    return arr1.every((obj, index) => {
        const otherObj = arr2[index];

        if (typeof obj !== 'object' || obj === null ||
            typeof otherObj !== 'object' || otherObj === null) {
            return obj === otherObj;
        }

        const keys1 = Object.keys(obj) as (keyof T)[];
        const keys2 = Object.keys(otherObj) as (keyof T)[];

        if (keys1.length !== keys2.length) return false;

        return keys1.every(key => obj[key] === otherObj[key]);
    });
};