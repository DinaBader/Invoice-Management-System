<template>
  <v-dialog v-model="dialogVisible" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Invoice</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="localInvoice.CustomerName" label="Customer Name"></v-text-field>
          <v-text-field v-model="localInvoice.Description" label="Description"></v-text-field>
          <v-text-field v-model="localInvoice.Status" label="Status"></v-text-field>
          <v-text-field v-model="localInvoice.Received" label="Received"></v-text-field>
          <v-text-field v-model="localInvoice.Remaining" label="Remaining"></v-text-field>
          <v-text-field v-model="localInvoice.Total" label="Total"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="updateInvoice">Update</v-btn>
        <v-btn color="red darken-1" text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    invoice: {
      type: Object,
      required: true,
    },
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: this.isDialogOpen,
      localInvoice: { ...this.invoice },
    };
  },
  watch: {
    isDialogOpen(newVal) {
      this.dialogVisible = newVal;
      if (!newVal) {
        this.localInvoice = { ...this.invoice };
      }
    },
  },
  methods: {
    async updateInvoice() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.put(`http://localhost:3000/Invoice/${this.localInvoice.id}`, this.localInvoice, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Updated invoice:', response.data);
        this.$emit('update:isDialogOpen', false);
      } catch (error) {
        console.error('Error updating invoice:', error);
      }
    },
    closeDialog() {
      this.$emit('update:isDialogOpen', false);
    },
  },
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
