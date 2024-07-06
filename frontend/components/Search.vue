<template>
  <v-card class="mx-auto" color="transparent" max-width="400">
    <v-card-text>
      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="standard"
        label="Search by status, name..."
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
        v-model="searchItem"
        class="custom-search-field"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import { getInvoiceByStatus } from '@/service/getInvoicesService';
import {getInvoices} from '@/service/getInvoicesService'
export default {
  data: () => ({
    loading: false,
    searchItem: ''
  }),
  methods: {
    async onClick() {
      this.loading = true;
    try {
      if (this.searchItem.trim() === '') {
        const filteredInvoices = await getInvoices();
        this.$emit('search', filteredInvoices); 
      } else {
        const filteredInvoices = await getInvoiceByStatus(this.searchItem, this.$router);
        this.$emit('search', filteredInvoices);
      }
    } catch (error) {
      console.error("Error fetching invoices by status:", error);
      this.$emit('search', []);
    } finally {
      this.loading = false;
    }
  }
  }
};
</script>

<style scoped>
.custom-search-field {
  width: 100%;
  height: 48px;
  font-size: 16px;
}
</style>
