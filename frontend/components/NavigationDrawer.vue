<template>
  <v-navigation-drawer v-model="drawer" app width="220" image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...">
    <v-list>
      <NuxtLink to="/dashboard" class="custom-link">
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
      </NuxtLink>
      <NuxtLink to="/create" class="custom-link">
        <v-list-item prepend-icon="mdi-plus" title="Create Invoice"></v-list-item>
      </NuxtLink>
      <NuxtLink to="/" @click="logout" class="custom-link">
        <v-list-item prepend-icon="mdi-logout" title="Logout"></v-list-item>
      </NuxtLink>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppDrawer',
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    logout() {
      try {
        localStorage.removeItem('accessToken');
        this.$router.push('/');
      } catch (error) {
        console.error('couldnt remove token', error);
      }
    }
  }
};
</script>

<style scoped>
.custom-link {
  color: inherit;
  text-decoration: none;
}
</style>
