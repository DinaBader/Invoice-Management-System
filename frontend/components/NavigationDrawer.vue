<template>
  <div>
    <v-app-bar color="blue-grey" :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Invoice Management</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app width="220" class="navigation-drawer">
      <v-list>
        <NuxtLink to="/dashboard" @click="goToDashboard" class="custom-link">
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="inbox"></v-list-item>
        </NuxtLink>
        <NuxtLink to="/create" @click="goToCreate" class="custom-link">
          <v-list-item prepend-icon="mdi-plus" title="Create Invoice" value="createInvoice"></v-list-item>
        </NuxtLink>
        <NuxtLink to="/" @click="logout" class="custom-link">
          <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
        </NuxtLink>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    goToDashboard() {
      console.log('to dashboard');
    },
    goToCreate() {
      console.log('to create');
    },
    logout() {
      try {
        localStorage.removeItem('accessToken');
        this.$router.push('/');
      } catch (error) {
        console.error('couldnt remove token', error);
      }
    },
  },
};
</script>

<style scoped>
.custom-link {
  color: inherit;
  text-decoration: none;
}

.navigation-drawer{
  background:url('../assets/dashboard-background.jpg')
}
</style>
