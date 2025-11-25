"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sumByStatus(invoices) {
    return invoices.reduce((acc, invoice) => {
        if (invoice.status === "paid") {
            acc.paid += invoice.amount;
        }
        else if (invoice.status === "free") {
            acc.free += invoice.amount;
        }
        return acc;
    }, { paid: 0, free: 0 });
}
const invoices = [
    { id: '1', amount: 100, status: "paid" },
    { id: '2', amount: 50, status: "free" },
    { id: '3', amount: 70, status: "paid" },
];
console.log(sumByStatus(invoices));
//# sourceMappingURL=task_6.js.map