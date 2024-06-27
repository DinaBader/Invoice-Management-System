<template>
    <v-container >
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
            <p class="header-title">Invoice Managment System</p>
          <div class="login-container">
            <p class="login-title">Login</p>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                :rules="rules"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="rules"
                label="Password"
                type="password"
              ></v-text-field>
              <v-btn class="mt-2" type="submit" block>Submit</v-btn>
            </v-form>       
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import {loginUser} from '../service/loginService'
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await loginUser(this.username, this.password);
        } catch (error) {
          console.error('Error Logging in:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  @import '@/style/login.css' ;
  </style>
  