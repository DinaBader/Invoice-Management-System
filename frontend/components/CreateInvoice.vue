<template>
  <v-dialog :value="isDialogOpen" max-width="600" @input="emitCloseDialogEvent">
    <v-card>
      <v-card-title>Create New Invoice</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="createInvoice">
          <v-text-field v-model="form.CustomerName" label="Customer Name"></v-text-field>
          <v-text-field v-model="form.Description" label="Description"></v-text-field>
          <v-text-field v-model="form.Status" label="Status"></v-text-field>
          <v-text-field v-model="form.Received" label="Received"></v-text-field>
          <v-text-field v-model="form.Remaining" label="Remaining"></v-text-field>
          <v-text-field v-model="form.Total" label="Total"></v-text-field>
          
          <v-btn type="submit" color="primary">Create Invoice</v-btn>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isDialogOpen: Boolean,
  },
  data() {
    return {
      form: {
        CustomerName: '',
        Description: '',
        Status: '',
        Received: '',
        Remaining: '',
        Total: ''
      }
    };
  },
  methods: {
    async createInvoice() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post('http://localhost:3000/Invoice', this.form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Invoice created:', response.data);

        this.closeDialog();
      } catch (error) {
        console.error('Error creating invoice:', error);
      }
    },
    closeDialog() {
      this.$emit('update:isDialogOpen', false); // Emit event to update prop in parent
    },
    emitCloseDialogEvent(value) {
      // Handle dialog closing event
      if (!value) {
        this.$emit('update:isDialogOpen', false);
      }
    }
  }
};
</script>

<style scoped>
/* Any scoped styles */
</style>
