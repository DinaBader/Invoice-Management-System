<template>
    <div class="background">
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" sm="8" md="6" lg="4">
                    <p class="header-title">Invoice Managment System</p>
                    <v-form ref="registerForm" @submit.prevent="handleRegister">
                        <div class="form-container">
                            <p class="form-title">Register</p>
                            <v-text-field v-model="userName" label="Username" :rules="usernameRules"></v-text-field>
                            <v-text-field v-model="firstName" label="Firstname" :rules="firstnameRules"></v-text-field>
                            <v-text-field v-model="lastName" label="Lastname" :rules="lastnameRules"></v-text-field>
                            <v-text-field v-model="password" label="Password " :rules="passwordRules" type="password"></v-text-field>
                            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
                            <NuxtLink to="/">
                            <v-btn class="register-button" >Login </v-btn>
                            </NuxtLink>  
                        </div>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
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
        usernameRules:[
          value=>{
              if(value) return true
              return "You must enter a Username";
          }
        ],
        firstnameRules:[
          value=>{
              if(value) return true
              return "You must enter a First Name";
          }
        ],
        lastnameRules:[
          value=>{
              if(value) return true
              return "You must enter a Last Name";
          }
        ],
        passwordRules:[
          value=>{
              if(value) return true
              return "You must enter a Password";
          }
        ],
      };
    },
    methods:{
        async handleRegister(){
            const isValid = this.$refs.registerForm.validate();
            if (!isValid) {
            console.log('Form is not valid');
            return;
            }
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
  