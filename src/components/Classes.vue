<template>
  <div>
    <EditForm
      id="Edit Class"
      v-bind:data="this.getClassById(this.classId)"
      v-on:close="dialog = false"
      v-if="dialog"
    />

    <v-container>
      <v-data-iterator :items="classes" hide-default-footer>
        <template v-slot:header>
          <v-toolbar class="mb-1" color="transparent" elevation="0">
            <v-text-field
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="search"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle mandatory>
                <v-btn large depressed color="blue" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="blue" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row no-gutters>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="ma-4" max-width="500">
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>{{
                  `${item.mentorships.length} Mentorships`
                }}</v-card-subtitle>
                <v-card-text class="card-info-item">
                  {{ item.schedule }}
                </v-card-text>
                <v-card-text class="card-info-item">
                  {{ item.info }}
                </v-card-text>
                <!-- <div class="card-spacer" /> -->
                <v-card-actions>
                  <v-btn
                    class="action-button"
                    text
                    v-on:click="editClass(item._id)"
                    >EDIT</v-btn
                  >

                  <v-btn color="red" class="action-button" text>
                    DELETE
                  </v-btn>

                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <!-- <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn dark text color="primary" class="ml-2" v-on="on">
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template> -->
      </v-data-iterator>
    </v-container>
    <ErrorMessage />
    <SuccessMessage />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import { getFormat, buildPayloadPagination } from '@/utils/utils.js'
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
    return { dialog: false, id: '123', currentClass: {}, mode: '' }
  },
  computed: {
    ...mapGetters(['getClassById']),
    classes() {
      return this.$store.state.classes.classes
    }
  },
  watch: {},
  methods: {
    ...mapActions(['getAllClasses']),
    editClass(id) {
      this.dialog = true
      this.mode = 'edit'
      this.classId = id
    }
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

.action-button {
  min-width: 0px !important;
}
</style>
