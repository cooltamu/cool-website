<template>
  <div>
    <EditForm
      id="Edit Class"
      v-bind:data="getClassbyId(id)"
      v-bind:open="dialog"
    />
    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="item in $store.state.classes.classes"
          :key="item._id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="ma-4" max-width="500">
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle>{{
              `${item.mentorships.length} Mentorships`
            }}</v-card-subtitle>
            <v-card-text class="card-info-item">
              {{ item.schedule }}
            </v-card-text>
            <v-card-text class="card-info-item"> {{ item.info }} </v-card-text>
            <div class="card-spacer" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <ErrorMessage />
    <SuccessMessage />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'
import EditForm from './ClassEditForm.vue'

export default {
  components: {
    EditForm
  },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('events.TITLE')} - %s`
    }
  },
  data() {
    return { dialog: true, id: '123' }
  },
  computed: {
    ...mapGetters(['getClassbyId'])
  },
  watch: {},
  methods: {
    ...mapActions(['getAllClasses'])
  },
  async mounted() {
    await this.getAllClasses()
  }
}
</script>

<style>
.card-info-item {
  padding: 0px 16px 8px 16px;
}
.card-spacer {
  padding: 8px 16px 8px 16px;
}
</style>
