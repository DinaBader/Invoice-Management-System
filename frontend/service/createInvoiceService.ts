import axios from 'axios';

export async function createInvoice(CustomerName: string, Description: string, Total: number, Received: number,  Remaining: number,Status:string) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post("http://localhost:3000/Invoice", {
            Description,
            CustomerName,
            Total,
            Received,
            Remaining,
            Status
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Couldn't create invoice: ", error);
    }
}
