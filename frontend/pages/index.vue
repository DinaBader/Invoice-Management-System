<template>
  <div class="background">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <p class="header-title">Invoice Management System</p>
          <div class="form-container">
            <p class="form-title">Login</p>
            <v-form ref="loginForm" @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                :rules="userNameRules"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                type="password"
              ></v-text-field>
              <v-alert v-if="loginError" type="error">{{ loginError }}</v-alert>
              <v-btn class="mt-2" :disabled="submitButtonDisabled" type="submit" block>Submit</v-btn>
            </v-form>
            <NuxtLink to="/register">
              <v-btn class="register-button">Register</v-btn>
            </NuxtLink>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { loginUser } from '../service/loginService';

export default {
  data() {
    return {
      username: '',
      password: '',
      userNameRules: [
        value => {
          if (value) return true;
          return 'You must enter a Username';
        }
      ],
      passwordRules: [
        value => {
          if (value) return true;
          return 'You must enter a Password';
        }
      ],
      loginError: ''
    };
  },
  computed: {
    submitButtonDisabled() {
      return !this.username || !this.password;
    }
  },
  methods: {
    async handleLogin() {
      const isValid = await this.$refs.loginForm.validate();
      if (!isValid) {
        return;
      }

      try {
        const accessToken = await loginUser(this.username, this.password);
        console.log('Access Token:', accessToken); 
        localStorage.setItem('accessToken', accessToken);
        this.$router.push({ path: '/dashboard' });
      } catch (error) {
        console.error('Error Logging in:', error);
        this.loginError = 'Invalid username or password. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
@import '@/style/login.css';
</style>
