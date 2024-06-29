<template>
    <v-container >
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
            <p class="header-title">Invoice Managment System</p>
          <div class="form-container">
            <p class="form-title">Login</p>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
              ></v-text-field>
              <v-btn class="mt-2" type="submit" block>Submit</v-btn>
            </v-form>     
            <NuxtLink to="/register">
              <v-btn class="register-button" >Register </v-btn>
            </NuxtLink>  
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
          const accessToken = await loginUser(this.username, this.password);
          console.log('Access Token:', accessToken); 
          localStorage.setItem('accessToken',accessToken);
          this.$router.push({ path: '/dashboard' });
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
  