<template>
  <v-app>
    <AppBarNavigation />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="table-container">
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
import {getInvoices} from '../service/getInvoicesService';
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
      }
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
    handleSearch(filteredInvoices) {
      if (searchTerm.trim() === '') {
        this.filteredInvoices = this.invoices;
      } else {
        this.filteredInvoices = this.invoices.filter(invoice => {
          return invoice.CustomerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 invoice.Status.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }
    }
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
</style>
