<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <p class="header-title">Invoice Managment System</p>
                <v-form @submit.prevent="handleRegister">
                    <div class="form-container">
                        <p class="form-title">Register</p>
                        <v-text-field v-model="userName" label="Username"></v-text-field>
                        <v-text-field v-model="firstName" label="Firstname"></v-text-field>
                        <v-text-field v-model="lastName" label="Lastname"></v-text-field>
                        <v-text-field v-model="password" label="Password "></v-text-field>
                        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
                        <NuxtLink to="/">
                        <v-btn class="register-button" >Login </v-btn>
                        </NuxtLink>  
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
  </template>
  
  <script>
  import {RegisterUser} from '@/service/registerService'
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
      };
    },
    methods:{
        async handleRegister(){
            try{
                const accessToken = await RegisterUser(this.firstName, this.password,this.lastName,this.userName);
                console.log('Access Token:', accessToken); 
                localStorage.setItem('accessToken',accessToken);
                this.$router.push({ path: '/dashboard' });
            }catch(error){
                console.error("Error signing in: ",error);
            }
        }
    }
  };
  </script>
  
  <style scoped>
  @import '@/style/login.css'
  </style>
  