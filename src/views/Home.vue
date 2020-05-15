<template>
  <div class="home">
    <Volunteers />
    <Mission />
    <Snapshot />
  </div>
</template>

<script>
// @ is an alias to /src
// import NavBar from '@/components/NavBar.vue'
import Volunteers from '@/components/Volunteers.vue'
import Mission from '@/components/Mission.vue'
import Snapshot from '@/components/Snapshot.vue'

export default {
  name: 'Home',
  components: {
    // NavBar,
    Volunteers,
    Mission,
    Snapshot
  }
}
</script>
<style></style>
