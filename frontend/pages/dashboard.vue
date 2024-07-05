<template>
  <v-app>
    <AppBarNavigation />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
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
          </v-col>
        </v-row>
      </v-container>
      <Search @search="handleSearch"></Search>
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
import Search from '@/components/Search.vue';
import AppBarNavigation from '@/components/NavigationDrawer.vue';

export default {
  components: {
    EditInvoice,
    DeleteInvoice,
    Search,
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
    this.getInvoices();
  },
  methods: {
    async getInvoices() {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          this.$router.push({ path: '/' });
        } else {
          const response = await axios.get('http://localhost:3000/Invoice/get', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data) {
            this.invoices = response.data;
            this.filteredInvoices = response.data;
          } else {
            console.error('response.data is undefined');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
    handleSearch(searchItem) {
      if (searchItem.trim() === '') {
        this.filteredInvoices = this.invoices;
      } else {
        this.filteredInvoices = this.invoices.filter((item) => {
          return item.Status.toLowerCase().includes(searchItem.toLowerCase());
        });
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
</style>
