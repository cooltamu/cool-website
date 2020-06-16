<template>
  <div>
    <v-card class="px-2 card-body">
      <v-card-title>
        <div class="my-1">
          {{ title }}
        </div>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          v-show="actions.includes('search')"
          single-line
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-btn
          color="secondary"
          v-on:click="addItem"
          v-show="actions.includes('create')"
          :disabled="!actionsEnabled || this.selected.length < 1"
          class="ml-4 py-5"
        >
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
        <v-btn
          color="secondary"
          v-on:click="removeItem"
          v-show="actions.includes('delete')"
          :disabled="!actionsEnabled || this.selected.length < 1"
          class="ml-4 py-5"
        >
          <v-icon>mdi-account-remove</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="data"
        :server-items-length="count"
        single-select
        item-key="_id"
        :show-select="actions.includes('select')"
        :options.sync="pagination"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  name: 'ClassMemberList',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('events.TITLE')} - %s`
    }
  },
  props: {
    data: Array,
    title: String,
    showSearch: Boolean,
    showSelect: Boolean,
    count: Number,
    actions: Array,
    actionsEnabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      selected: [],
      search: '',
      pagination: {}
    }
  },
  computed: {
    ...mapGetters(['activeClass', 'allMembers']),
    classData() {
      return this.activeClass()
    },
    allMembers() {
      return this.getAllMembers()
    },
    id() {
      return this.$route.params.classId
    },
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Email',
          align: 'start',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Mentee',
          align: 'start',
          sortable: true,
          value: 'mentee.name'
        },
        {
          text: 'Mentor',
          align: 'start',
          sortable: true,
          value: 'mentor.name'
        }
      ].filter((header) => _.get(this.data[0], header.value))
    }
  },
  watch: {
    pagination(val) {
      this.applySearch()
    },
    search(val) {
      this.applySearch()
    },
    selected(val) {
      this.$emit('select', this.selected[0])
    }
  },
  methods: {
    ...mapActions(['getMembers', 'addTeacher', 'getAllTeachers']),
    async applySearch() {
      this.$emit('search', {
        search: this.search,
        pagination: this.pagination
      })

      // await this.getAllTeachers({
      //   search: this.search,
      //   pagination: this.pagination
      // })
    },
    addItem() {
      this.$emit('add-item', this.selected[0])
      this.selected = []
    },
    removeItem() {
      this.$emit('remove-item', this.selected[0])
      this.selected = []
    },
    async addMember() {
      // eslint-disable-next-line no-alert
      await this.addTeacher({
        userId: this.selected[0]._id,
        classId: this.activeClass._id
      })
    }
  },
  async mounted() {}
}
</script>

<style>
/* .card-body {
  min-height: 350px;
} */
</style>
