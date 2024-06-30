<template>
    <v-app>
      <app-drawer></app-drawer>
      <v-sheet class="mx-auto create-container" width="800">
        <v-form @submit.prevent>
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
                v-model="itemdescription"
                :rules="rules"
                label="Item Description"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="total"
                :rules="rules"
                label="Total"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="paid"
                :rules="rules"
                label="Paid"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="received"
                :rules="rules"
                label="Received"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="remaining"
                :rules="rules"
                label="Remaining"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>
      </v-sheet>
    </v-app>
  </template>
  
  <script>
  import AppDrawer from '@/components/NavigationDrawer.vue';
  
  export default {
    components: {
      AppDrawer
    },
    data() {
      return {
        customername: '',
        itemdescription: '',
        total: '',
        paid: '',
        received: '',
        remaining: '',
        rules: [value => !!value || 'Required.']
      }
    }
  }
  </script>

  <style>
    .create-container{
        padding-left:100px;
        padding-top:100px
    }
    </style>
  