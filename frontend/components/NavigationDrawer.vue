<template>
    <v-navigation-drawer :width="220" app   image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Welcome </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
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
  </template>
  
  <script>
  export default {
    name: 'AppDrawer',
    methods:{
        logout(){
            try{
                localStorage.removeItem('accessToken');
      
            }catch(error){
                console.error("couldnt remove token",error);
            }
        },
        goToDashboard(){
          console.log(" to dashboard");
        },
        goToCreate(){
          console.log(" to create")
        },
        drawerToggled() {
      if (!this.drawer) {
        this.$emit('toggle-snackbar', true); 
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
  