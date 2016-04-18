export function getFirstKeyFromObject(dict) {
    for (let index in dict) {
        if (dict.hasOwnProperty(index)) {
            return index;
        }
    }
}
