function applyPipeline<T>(value: T, ...fns: Array<(arg: any) => any>): unknown {
  return fns.reduce((acc, fn) => fn(acc), value);
}


const square = (x: number): number => x * x;

const toString = (x: number): string => x.toString();

const makeFancyString = (str: string): string => `Результат: ${str}`;

const result = applyPipeline(5, square, toString, makeFancyString);

console.log(result);
