<template>
    <v-app>
      <app-drawer></app-drawer>
      <v-sheet class="mx-auto create-container" width="800">
          <p class="header">Create Invoice</p>
        <v-form ref="CreateInvoiceForm" @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="customername"
                :rules="rules"
                label="Customer Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="total"
                :rules="rules"
                label="Total"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="received"
                :rules="rules"
                label="Received"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="remaining"
                :rules="rules"
                label="Remaining"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="duedate"
                :rules="rules"
                label="Due Date"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
            <v-select
                v-model="status"
                :items="['Paid', 'Pending', 'Financed']"
                label="Status"
            ></v-select>
        </v-col>
          </v-row>
          <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>
      </v-sheet>
    </v-app>
  </template>
  
  <script>
  import AppDrawer from '@/components/NavigationDrawer.vue';
  import {createInvoice} from '@/service/createInvoiceService'

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
        duedate:'',
        rules: [value => !!value || 'Required.']
      }
    },
    methods: {
        async submitForm() {
            const isValid = await this.$refs.CreateInvoiceForm.validate();
            
            if (!isValid) {
            console.log('Form is not valid');
            return;
            }

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
        },
    }
  }
  </script>

  <style>
  @import '@/style/login.css';
    .create-container{
        padding-left:100px;
        padding-top:100px
    }
    .header{
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        margin-top: -20px;
        margin-bottom:20px
    }
    </style>
  