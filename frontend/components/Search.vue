<template>
    <v-card
      class="mx-auto"
      color="surface-light"
      max-width="400"
    >
      <v-card-text>
        <v-text-field
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="standard"
          label="Search by status, name..."
          variant="solo"
          hide-details
          single-line
          @click:append-inner="onClick"
          v-model="searchItem"
          class="custom-search-field"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </template>
  <script>
    export default {
      data: () => ({
        loading: false,
        searchItem:''
      }),
  
      methods: {
        onClick () {
            this.$emit('search', this.searchItem);
        },
      },
    }
  </script>

<style>

  .custom-search-field {
    width: 300px; 
    height: 48px; 
    font-size: 16px;
  }
</style>