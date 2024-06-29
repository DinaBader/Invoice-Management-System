// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/pages/dashboard.vue';
import EditInvoice from '@/components/EditInvoice.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // Ensure you are using history mode for clean URLs
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/dashboard/:id',
      name: 'EditInvoice',
      component: EditInvoice,
      props: true,
    },
  ],
});
