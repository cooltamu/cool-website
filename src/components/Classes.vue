<template>
  <div>
    <EditForm
      id="Edit Class"
      v-bind:data="this.getClassById(this.classId)"
      v-bind:mode="mode"
      v-on:close="close()"
      v-if="dialog"
    />

    <v-container>
      <v-data-iterator
        :items="classes"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-row dense class="px-4 my-4">
            <v-col cols="12" sm="12" md="4">
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="search"
                label="Search"
                dense
              />
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="filter_list"
                label="Sort by"
                dense
              />
            </v-col>
            <v-col cols="4" sm="4" md="2">
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed :value="false" class="dense-button">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed :value="true" class="dense-button">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="12" sm="12" md="3" class="text-right">
              <v-btn
                color="secondary"
                v-on:click="createClass()"
                class="btnNewItem pr-4"
              >
                <v-icon class="mr-2">mdi-plus</v-icon>
                {{ $t('dataTable.NEW_ITEM') }}
              </v-btn>
            </v-col>
          </v-row>
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
              <!-- <router-link :to="'classes/' + item._id"> -->
              <v-card
                class="ma-4 card"
                max-width="500"
                :to="'classes/' + item._id"
              >
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>{{
                  `${item.mentorships.length} Mentorships`
                }}</v-card-subtitle>
                <v-card-text class="card-info-item">
                  {{ item.schedule }}
                </v-card-text>
                <v-card-text class="card-info-item">
                  {{ item.location }}
                </v-card-text>
                <v-card-text class="card-info-item">
                  {{ item.info }}
                </v-card-text>
                <!-- <div class="card-spacer" /> -->
                <v-card-actions>
                  <v-btn
                    color="blue"
                    class="action-button"
                    text
                    v-on:click="editClass(item._id)"
                    >EDIT</v-btn
                  >

                  <v-btn
                    color="red"
                    class="action-button"
                    text
                    v-on:click="handleDeleteClass(item._id)"
                  >
                    DELETE
                  </v-btn>

                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
              <!-- </router-link> -->
            </v-col>
          </v-row>
        </template>
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
    return {
      dialog: false,
      id: '123',
      currentClass: {},
      mode: '',
      search: '',
      sortBy: 'name',
      keys: ['name', 'info', 'schedule'],
      filter: {},
      sortDesc: false
    }
  },
  computed: {
    ...mapGetters(['getClassById']),
    classes() {
      return this.$store.state.classes.classes
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== `Name`)
    }
  },
  watch: {},
  methods: {
    ...mapActions(['getAllClasses', 'deleteClass']),
    editClass(id) {
      this.dialog = true
      this.mode = 'edit'
      this.classId = id
    },
    createClass() {
      this.dialog = true
      this.mode = 'create'
    },
    async handleDeleteClass(id) {
      const response = await this.$confirm(
        this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),
        {
          title: this.$t('common.WARNING'),
          buttonTrueText: this.$t('common.DELETE'),
          buttonFalseText: this.$t('common.CANCEL'),
          buttonTrueColor: 'red'
          // buttonFalseColor: 'green'
        }
      )
      if (response) {
        await this.deleteClass(id)
      }
    },
    close() {
      this.dialog = false
      this.classId = ''
    }
  },
  async mounted() {
    await this.getAllClasses()
  }
}
</script>

<style>
.card {
  text-align: left;
}
.card-info-item {
  padding: 0px 16px 8px 16px;
}
.card-spacer {
  padding: 8px 16px 8px 16px;
}

.action-button {
  min-width: 0px !important;
}

.dense-button {
  height: 38px !important;
}
</style>
