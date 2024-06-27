<template>
    <div>
      <v-text-field
        clearable
        :label="label"
        class="custom-text-field"
      ></v-text-field>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextField',
    props: {
      label: {
        type: String,
        default: 'Default Label'
      }
    }
  }
  </script>
  
  <style scoped>
  .custom-text-field {
    width: 100%;
  }
  </style>
  