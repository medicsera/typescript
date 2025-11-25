type Invoice = {

    id: string,
    amount: number,
    status: "paid" | "free"
}

function sumByStatus(invoices: Invoice[]): {paid: number; free: number} {
    return invoices.reduce(
        (acc, invoice) => {
            if (invoice.status === "paid"){
                acc.paid += invoice.amount
            } else if (invoice.status === "free"){
                acc.free += invoice.amount
            }
            return acc
        },
        {paid: 0, free: 0}
    );
}


const invoices: Invoice[] = [
    {id: '1',amount: 100, status: "paid"},
    {id: '2',amount: 50, status: "free"},
    {id: '3',amount: 70, status: "paid"},
]

console.log(sumByStatus(invoices))
