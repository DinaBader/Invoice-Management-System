<template>
  <v-app>
    <app-drawer></app-drawer>
    <v-container fluid class="main-container">
      <v-sheet class="mx-auto create-container" max-width="800">
        <p class="header">Create Invoice</p>
        <v-form ref="CreateInvoiceForm" v-model="formValid" @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="customername"
                :rules="[rules.required]"
                label="Customer Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="total"
                :rules="[rules.required, rules.number]"
                label="Total"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="received"
                :rules="[rules.required, rules.number]"
                label="Received"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="remaining"
                :rules="[rules.required, rules.number]"
                label="Remaining"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="duedate"
                :rules="[rules.required]"
                label="Due Date"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="status"
                :items="['Paid', 'Pending', 'Financed']"
                :rules="[rules.required]"
                label="Status"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-btn class="mt-2" type="submit" block :disabled="!formValid">Submit</v-btn>
        </v-form>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<script>
import AppDrawer from '@/components/NavigationDrawer.vue';
import { createInvoice } from '@/service/createInvoiceService';

export default {
  components: {
    AppDrawer
  },
  data() {
    return {
      customername: '',
      total: '',
      received: '',
      remaining: '',
      status: '',
      duedate: '',
      formValid: false,
      rules: {
        required: value => !!value || 'Required.',
        number: value => !isNaN(value) || 'Must be a number.'
      }
    }
  },
  methods: {
    async submitForm() {
      if (this.$refs.CreateInvoiceForm.validate()) {
        try {
          await createInvoice(
            this.customername,
            this.total,
            this.received,
            this.remaining,
            this.status,
            this.duedate
          );
          this.$router.push({ path: '/dashboard' });
        } catch (error) {
          console.error('Error creating invoice: ', error);
        }
      } else {
        console.log('Form is not valid');
      }
    },
  }
}
</script>

<style>
@import '@/style/login.css';
.main-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.create-container {
  padding: 16px;
}
.header {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
}
@media (min-width: 600px) {
  .create-container {
    padding-left: 100px;
    padding-top: 100px;
    max-height: none;
    overflow-y: visible;
  }
}
@media (max-width: 599px) {
  .create-container {
    max-height: 80vh;
    overflow-y: auto;
  }
}
</style>
