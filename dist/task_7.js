"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chunkArray(items, chunkSize) {
    if (chunkSize <= 0 || !Number.isInteger(chunkSize)) {
        throw new Error("Некорректный chunkSize");
    }
    const result = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        result.push(items.slice(i, i + chunkSize));
    }
    return result;
}
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(chunkArray(data, 3));
//# sourceMappingURL=task_7.js.map