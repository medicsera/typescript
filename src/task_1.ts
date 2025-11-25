function formatInput(value: number): string;
function formatInput(value: string): string;
function formatInput(value: Date): string;

function formatInput(value: number | string | Date): string {
    switch (typeof value) {
        case 'number':
            return value.toFixed(1);
        case 'string':
            return value.toUpperCase();
        case 'object':
            if (value instanceof Date){
                const year = value.getFullYear();
                const month = String(value.getMonth() + 1).padStart(2, '0');
                const day = String(value.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            const _uncorrectObject: never = value as never
            return _uncorrectObject
    }
    const _uncorrectType: never = value
    return _uncorrectType
}


console.log(formatInput(123))
console.log(formatInput("string"))
console.log(formatInput(new Date(2025, 9, 2)))
