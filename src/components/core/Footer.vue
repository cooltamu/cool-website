<template>
  <v-footer height="40" class="d-block text-center">
    <div>
      Copyright &copy; 2020 COOL | All rights reserved
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    }
  }
}
</script>
