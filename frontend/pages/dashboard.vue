<template>
  <v-app>
    <AppBarNavigation  @search="handleSearch" :invoices="invoices"/>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="table-container">
              <div v-if="error" class="error-box">
                <div class="error-message">{{ error }}</div>
              </div>

              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Invoice nbr</th>
                    <th class="text-left">Customer Name</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Received</th>
                    <th class="text-left">Remaining</th>
                    <th class="text-left">Total</th>
                    <th class="text-left">Created At</th>
                    <th class="text-left">Due Date</th>
                    <th class="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredInvoices" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.CustomerName }}</td>
                    <td>{{ item.Status }}</td>
                    <td>{{ item.Received }}</td>
                    <td>{{ item.Remaining }}</td>
                    <td>{{ item.Total }}</td>
                    <td>{{ item.createdAt }}</td>
                    <td>{{ item.DueDate }}</td>
                    <td>
                      <v-icon @click="openDeleteDialog(item)" class="icon-spacing">mdi-delete</v-icon>
                      <v-icon @click="openEditDialog(item)" class="icon-spacing">mdi-pencil</v-icon>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-col>
        </v-row>
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
import { getInvoices } from '../service/getInvoicesService';
import EditInvoice from '@/components/EditInvoice.vue';
import DeleteInvoice from '@/components/DeleteInvoice.vue';
import AppBarNavigation from '@/components/NavigationDrawer.vue';

export default {
  components: {
    EditInvoice,
    DeleteInvoice,
    AppBarNavigation,
  },
  data() {
    return {
      invoices: [],
      filteredInvoices: [],
      isDialogOpen: false,
      isDialogOpenDelete: false,
      selectedInvoice: null,
      selectedInvoiceToDelete: null,
      error: null
    };
  },
  created() {
    this.loadInvoices();
  },
  methods: {
    async loadInvoices() {
      const invoices = await getInvoices(this.$router);
      if (invoices) {
        this.invoices = invoices;
        this.filteredInvoices = invoices;
      } else {
        this.showError('Unauthorized. Redirecting');
      }
    },
    showError(errorMessage) {
      this.error = errorMessage;
    },
    dismissError() {
      this.error = null;
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
    handleSearch(searchTerm) {
      if(searchTerm===""){
        this.filteredInvoices = this.invoices;
      }
      else{

        this.filteredInvoices = searchTerm; 
      }
    },
  },
};
</script>

<style scoped>
.icon-spacing {
  margin-right: 8px;
  vertical-align: middle;
}

.table-container {
  height: 400px;
  overflow-y: auto;
}

.error-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #bb0101;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message {
  font-size: 16px;
  color: #f5f5f5;
}

</style>
