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
          v-show="showSelect"
          single-line
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-btn color="secondary" v-on:click="addItem" class="ml-4 py-5">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="data"
        :server-items-length="count"
        single-select
        item-key="_id"
        :show-select="showSelect"
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
    count: Number
  },
  data() {
    return {
      selected: [],
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'email',
          align: 'start',
          sortable: true,
          value: 'email'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getActiveClass', 'getAllMembers']),
    classData() {
      return this.getActiveClass()
    },
    allMembers() {
      return this.getAllMembers()
    },
    id() {
      return this.$route.params.classId
    }
  },
  watch: {
    pagination(val) {
      this.applySearch()
    },
    search(val) {
      this.applySearch()
    }
  },
  methods: {
    ...mapActions([
      'getMembers',
      'addTeacher',
      'getActiveClass',
      'getAllTeachers'
    ]),
    buildSearch() {
      return {
        query: [this.search, 'mentor'].join(','),
        fields: ['name', 'role'].join(',')
      }
    },
    async applySearch() {
      await this.getAllTeachers({
        search: this.search,
        pagination: this.pagination
      })
    },
    addItem() {
      console.log('!!')
      this.$emit('add-item', 'foo')
    },
    async addMember() {
      // eslint-disable-next-line no-alert
      await this.addTeacher({
        userId: this.selected[0]._id,
        classId: this.getActiveClass()._id
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
