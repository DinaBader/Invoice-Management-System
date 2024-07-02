import axios from 'axios';

export async function createInvoice(CustomerName: string, Total: number, Received: number, Remaining: number,Status:string, DueDate: string) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post("http://localhost:3000/Invoice", {
            CustomerName,
            Total,
            Received,
            Remaining,
            Status,
            DueDate
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Couldn't create invoice: ", error);
    }
}
