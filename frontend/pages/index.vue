<template>
    <v-container >
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
            <p class="header-title">Invoice Managment System</p>
          <div class="login-container">
            <p class="login-title">Login</p>
            <TextField label="Username" class="input-field" />
            <TextField label="Password" class="input-field" />
            <ButtonComponent  :buttonText="'Login'"></ButtonComponent >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import TextField from '@/components/base/baseTextField.vue';
  import ButtonComponent  from '@/components/base/baseButton.vue';
  export default {
    components: {
        TextField,
        ButtonComponent ,
    }
  }
  </script>
  
  <style scoped>


  .login-container {
    margin-top: 70px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .login-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .header-title{
    text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px; /* Adjust this value to move the title closer to the container */
  color: #333;

  }

  .input-field {
    margin-bottom: 16px;
  }
  </style>
  