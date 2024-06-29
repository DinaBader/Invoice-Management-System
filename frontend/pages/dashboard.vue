<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Invoice nbr</th>
          <th class="text-left">Customer Name</th>
          <th class="text-left">Description</th>
          <th class="text-left">Status</th>
          <th class="text-left">Received</th>
          <th class="text-left">Remaining</th>
          <th class="text-left">Total</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in invoices" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.CustomerName }}</td>
          <td>{{ item.Description }}</td>
          <td>{{ item.Status }}</td>
          <td>{{ item.Received }}</td>
          <td>{{ item.Remaining }}</td>
          <td>{{ item.Total }}</td>
          <td>
            <v-icon @click="deleteInvoice(item.id)" class="icon-spacing">mdi-delete</v-icon>
            <v-icon @click="openEditDialog(item)" class="icon-spacing">mdi-pencil</v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>

    <edit-invoice
      v-if="selectedInvoice"
      :invoice="selectedInvoice"
      :is-dialog-open="isDialogOpen"
      @update:isDialogOpen="updateDialogOpen"
      @close-dialog="closeEditDialog"
    ></edit-invoice>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mdiDelete, mdiPencil } from '@mdi/js';
import EditInvoice from '@/components/EditInvoice.vue';

export default {
  components: {
    EditInvoice,
  },
  data() {
    return {
      invoices: [],
      mdiPencil,
      mdiDelete,
      isDialogOpen: false,
      selectedInvoice: null,
    };
  },
  created() {
    this.getInvoices();
  },
  methods: {
    async getInvoices() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:3000/Invoice/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          this.invoices = response.data;
        } else {
          console.error('response.data is undefined');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    
    deleteInvoice(id) {
      console.log('Delete invoice with id:', id);
    },
    openEditDialog(invoice) {
      this.selectedInvoice = invoice;
      this.isDialogOpen = true;
    },
    updateDialogOpen(value) {
      this.isDialogOpen = value;
    },
    closeEditDialog() {
      this.isDialogOpen = false;
      this.selectedInvoice = null;
    },
  },
};
</script>

<style scoped>
.icon-spacing {
  margin-right: 8px; 
  vertical-align: middle; 
}
</style>
