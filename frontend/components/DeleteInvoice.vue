<template>
  <v-dialog v-model="dialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-card-text>
        Are you sure you want to delete invoice {{ invoice.id }}?
      </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="confirmDelete">Yes</v-btn>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
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
    };
  },
  watch: {
    isDialogOpen(newVal) {
      this.dialogVisible = newVal;
    },
  },
  methods: {
    async confirmDelete() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.delete(`http://localhost:3000/Invoice/${this.invoice.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Deleted invoice:', response.data);
        this.$emit('update:isDialogOpen', false); 
        this.$emit('close-dialog'); 
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    },
    closeDialog() {
      this.$emit('update:isDialogOpen', false);
      this.$emit('close-dialog'); 
    },
  },
};
</script>

<style scoped>
</style>
