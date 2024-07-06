<template>
  <div>
    <v-app-bar color="blue-grey" :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <div class="app-bar-content">
        <v-app-bar-title>Invoice Management</v-app-bar-title>
        <v-spacer></v-spacer>
        <div class="search-container" v-if="showSearch">
          <Search @search="handleSearch"  :allInvoices="invoices" />
        </div>
        <v-btn icon @click="toggleSearch">
          <v-icon>{{ showSearch ? 'mdi-close' : 'mdi-magnify' }}</v-icon>
        </v-btn>
      </div>
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
import Search from '@/components/Search.vue';

export default {
  components: {
    Search,
  },
  data() {
    return {
      drawer: false,
      showSearch: false,
      filteredInvoices: []
    };
  },
  props: ['invoices'],
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    logout() {
      try {
        localStorage.removeItem('accessToken');
        this.$router.push('/');
      } catch (error) {
        console.error('couldnt remove token', error);
      }
    },
    handleSearch(filteredInvoices) {
      console.log('Received filtered invoices:', filteredInvoices);
      this.filteredInvoices = filteredInvoices;
      this.$emit('search', filteredInvoices);
    },
  },
};
</script>

<style scoped>
.custom-link {
  color: inherit;
  text-decoration: none;
}

.navigation-drawer {
  background: url('../assets/dashboard-background.jpg');
}

.app-bar-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.search-container {
  flex: 1;
  margin-left: 16px;
}
</style>
