"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyPipeline(value, ...fns) {
    return fns.reduce((acc, fn) => fn(acc), value);
}
const square = (x) => x * x;
const toString = (x) => x.toString();
const makeFancyString = (str) => `Результат: ${str}`;
const result = applyPipeline(5, square, toString, makeFancyString);
console.log(result);
//# sourceMappingURL=task_5.js.map