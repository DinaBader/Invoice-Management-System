<template>
  <v-app>
    <app-drawer></app-drawer>

    <v-main>
      <v-container>
        <v-table>
          <!-- Table content -->
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
                <v-icon @click="openDeleteDialog(item)" class="icon-spacing">mdi-delete</v-icon>
                <v-icon @click="openEditDialog(item)" class="icon-spacing">mdi-pencil</v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-main>

    <edit-invoice
      v-if="selectedInvoice"
      :invoice="selectedInvoice"
      :is-dialog-open="isDialogOpen"
      @update:is-dialog-open="updateDialogOpen"
      @close-dialog="closeEditDialog"
    ></edit-invoice>

    <delete-invoice
      v-if="selectedInvoiceToDelete"
      :invoice="selectedInvoiceToDelete"
      :is-dialog-open="isDialogOpenDelete"
      @update:is-dialog-open="updateDialogOpenDelete"
      @close-dialog="closeDeleteDialog"
    ></delete-invoice>
  </v-app>
</template>

<script>
import axios from 'axios';
import EditInvoice from '@/components/EditInvoice.vue';
import DeleteInvoice from '@/components/DeleteInvoice.vue';
import AppDrawer from '@/components/NavigationDrawer.vue'; // Import the AppDrawer component

export default {
  components: {
    EditInvoice,
    DeleteInvoice,
    AppDrawer, // Register the AppDrawer component
  },
  data() {
    return {
      invoices: [],
      isDialogOpen: false,
      isDialogOpenDelete: false,
      selectedInvoice: null,
      selectedInvoiceToDelete: null,
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
    openDeleteDialog(invoice) {
      this.selectedInvoiceToDelete = invoice;
      this.isDialogOpenDelete = true;
    },
    updateDialogOpen(value) {
      this.isDialogOpen = value;
    },
    updateDialogOpenDelete(value) {
      this.isDialogOpenDelete = value;
    },
    closeEditDialog() {
      this.isDialogOpen = false;
      this.selectedInvoice = null;
    },
    closeDeleteDialog() {
      this.isDialogOpenDelete = false;
      this.selectedInvoiceToDelete = null;
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
