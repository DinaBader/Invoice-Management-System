import type { Router } from "#vue-router";
import axios from "axios";

export async function getInvoices(router:Router) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push({ path: '/' });
      return null;
    }

    const response = await axios.get('http://localhost:3000/Invoice/get', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return null;
  }
}

export async function getInvoiceByStatus(searchItem:string, router:Router) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push({ path: '/' });
      return null;
    }

    const response = await axios.get(`http://localhost:3000/Invoice/status`, {
      headers:{
        Authorization:`Bearer ${token}`,
      },
      params: { status: searchItem }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching invoices by status:", error);
    router.push('/'); 
    throw error;
  }
}