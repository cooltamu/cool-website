<template>
  <div>
    <v-row dense style="margin: 10px 10px -10px 10px;">
      <v-col cols="12" sm="12" md="2" al>
        <div class="text-left">
          <v-toolbar-title>Scan People in</v-toolbar-title>
        </div>
      </v-col>
      <v-col cols="2" />
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          outlined
          dense
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('dataTable.SEARCH')"
          id="search"
          single-line
          hide-details
          clearable
          clear-icon="mdi-close"
        />
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <v-combobox
          outlined
          dense
          v-model="fieldsToSearch"
          :items="searchFields"
          label="Fields"
          multiple
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('cities.TITLE')} - %s`
    }
  },
  data() {
    return {
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['name']
    }
  },
  created() {
    let buffer = []
    /* eslint-disable */
    document.addEventListener('keydown', (event) => {
      // const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const key = event.key.toLowerCase()
      console.log(this)
      // // we are only interested in alphanumeric keys
      // if (charList.indexOf(key) === -1) return;

      buffer.push(key)
      // console.log(buffer);
      let minusIndex = -1
      let periodIndex = -1
      if (key === 'enter') {
        for (let i = 0; i < buffer.length; i++) {
          if (buffer[i] === '-') {
            minusIndex = i
          }
          if (buffer[i] === '.') {
            periodIndex = i
          }
        }
        if (minusIndex === -1 && periodIndex === -1) {
          buffer = []
        } else {
          let str = ''
          for (let i = minusIndex; i < buffer.length - 1; i++) {
            if (buffer[i] !== 'shift') {
              str += buffer[i]
            }
          }
          console.log(str)
        }
      }
    })
  },
  computed: {
    formTitle() {
      return this.editedItem._id
        ? this.$t('dataTable.EDIT_ITEM')
        : this.$t('dataTable.NEW_ITEM')
    },
    headers() {
      return [
        {
          text: this.$i18n.t('dataTable.ACTIONS'),
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text: this.$i18n.t('cities.headers.NAME'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$i18n.t('common.CREATED'),
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text: this.$i18n.t('common.UPDATED'),
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return this.$store.state.adminCities.cities
    },
    totalItems() {
      return this.$store.state.adminCities.totalCities
    }
  },
  watch: {
    dialog(value) {
      return value ? true : this.close()
    },
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.getCities(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.dataTableLoading = false
        }
      },
      deep: true
    },
    async search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    }
  },
  methods: {
    ...mapActions(['getCities', 'editCity', 'saveCity', 'deleteCity']),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getCities(
          buildPayloadPagination(this.pagination, this.buildSearch())
        )
        this.dataTableLoading = false
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    buildSearch() {
      return this.search
        ? { query: this.search, fields: this.fieldsToSearch.join(',') }
        : {}
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem(item) {
      try {
        const response = await this.$confirm(
          this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),
          {
            title: this.$t('common.WARNING'),
            buttonTrueText: this.$t('common.DELETE'),
            buttonFalseText: this.$t('common.CANCEL'),
            buttonTrueColor: 'red lighten3',
            buttonFalseColor: 'green'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.deleteCity(item._id)
          await this.getCities(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async save() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        try {
          this.dataTableLoading = true
          // Updating item
          if (this.editedItem._id) {
            await this.editCity(this.editedItem)
            await this.getCities(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveCity({ name: this.editedItem.name })
            await this.getCities(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          }
          this.close()
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.dataTableLoading = false
          this.close()
        }
      }
    }
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
