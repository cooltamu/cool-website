<template>
  <div>
    <v-data-table
      :loading="dataTableLoading"
      :no-data-text="$t('dataTable.NO_DATA')"
      :no-results-text="$t('dataTable.NO_RESULTS')"
      :headers="headers"
      :items="items"
      :options.sync="pagination"
      :items-per-page="5"
      :server-items-length="totalItems"
      class="elevation-1"
      :footer-props="{
        'items-per-page-text': $t('dataTable.ROWS_PER_PAGE'),
        'items-per-page-options': [5, 10, 25]
      }"
    >
      <template v-slot:top>
        <v-layout wrap>
          <v-flex xs12 sm12 md4 mt-3 pl-4>
            <div class="text-left">
              <v-toolbar-title>{{ $t('events.TITLE') }}</v-toolbar-title>
            </div>
          </v-flex>
          <v-flex xs12 sm6 md4 px-3>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('dataTable.SEARCH')"
              single-line
              hide-details
              clearable
              id="search"
              clear-icon="mdi-close"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4 mb-2 mt-2 pr-2>
            <ValidationObserver
              ref="observer"
              v-slot="{ invalid }"
              tag="form"
              @submit.prevent="submit()"
            >
              <v-dialog
                v-model="dialog"
                max-width="500px"
                content-class="dlgNewEditItem"
              >
                <template v-slot:activator="{ on }">
                  <div class="text-right">
                    <v-btn color="secondary" v-on="on" class="btnNewItem">
                      <v-icon class="mr-2">mdi-plus</v-icon>
                      {{ $t('dataTable.NEW_ITEM') }}
                    </v-btn>
                  </div>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <template v-if="editedItem._id">
                          <v-flex xs12 md6>
                            <label for="createdAt">{{
                              $t('common.CREATED')
                            }}</label>
                            <div name="createdAt">
                              {{ getFormat(editedItem.createdAt) }}
                            </div>
                          </v-flex>
                          <v-flex xs12 md6>
                            <label for="updatedAt">{{
                              $t('common.UPDATED')
                            }}</label>
                            <div name="updatedAt">
                              {{ getFormat(editedItem.updatedAt) }}
                            </div>
                          </v-flex>
                        </template>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              required
                              id="name"
                              name="name"
                              v-model="editedItem.name"
                              :label="$t('events.headers.NAME')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              required
                              id="info"
                              name="info"
                              v-model="editedItem.info"
                              :label="$t('events.headers.INFO')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              clearable
                              id="type"
                              name="type"
                              v-model="editedItem.type"
                              :items="types"
                              item-text="name"
                              item-value="value"
                              :label="$t('events.headers.TYPE')"
                              dateFormat="MMMM Do YYYY h:mm:ss a"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              class="inputType"
                            ></v-select>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-datetime-picker
                              required
                              id="start"
                              name="start"
                              v-model="editedItem.start"
                              :label="$t('events.headers.START_TIME')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-datetime-picker>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-datetime-picker
                              required
                              id="end"
                              name="end"
                              v-model="editedItem.end"
                              :label="$t('events.headers.END_TIME')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-datetime-picker>
                          </ValidationProvider>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red lighten3"
                      text
                      @click="close"
                      class="btnCancel"
                      >{{ $t('dataTable.CANCEL') }}</v-btn
                    >
                    <v-btn
                      color="green lighten3"
                      text
                      @click="save"
                      class="btnSave"
                      :disabled="invalid"
                      >{{ $t('dataTable.SAVE') }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </ValidationObserver>
          </v-flex>
        </v-layout>
      </template>
      <template v-slot:item._id="{ item }">
        <v-layout class="justify-center">
          <v-tooltip top>
            <!-- eslint-disable -->
            <template v-slot:activator="{ on }">
              <v-btn
                id="view"
                icon
                v-on="on"
                :to="'events/' + item._id"
                color="accent"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('dataTable.VIEW') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                id="edit"
                icon
                v-on="on"
                @click="editItem(item)"
                color="primary"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('dataTable.EDIT') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                id="delete"
                icon
                v-on="on"
                @click="deleteItem(item)"
                color="secondary"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('dataTable.DELETE') }}</span>
          </v-tooltip>
        </v-layout>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ getFormat(item.createdAt) }}
      </template>
      <template v-slot:item.updatedAt="{ item }">
        {{ getFormat(item.updatedAt) }}
      </template>
      <template v-slot:footer.page-text="{ pageStart, pageStop, itemsLength }">
        {{ pageStart }} - {{ pageStop }}
        {{ $t('dataTable.OF') }}
        {{ itemsLength }}
      </template>
      <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
      <template v-slot:no-results>{{ $t('dataTable.NO_RESULTS') }}</template>
    </v-data-table>
    <ErrorMessage />
    <SuccessMessage />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('events.TITLE')} - %s`
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
      fieldsToSearch: ['name', 'type']
    }
  },
  computed: {
    formTitle() {
      return this.editedItem._id
        ? this.$t('dataTable.EDIT_ITEM')
        : this.$t('dataTable.NEW_ITEM')
    },
    types() {
      return [
        { name: this.$t('eventTypes.MEETING'), value: 'meeting' },
        { name: this.$t('eventTypes.SESSION'), value: 'session' }
      ]
    },
    startClean() {
      return '2020-05-23 00:00'
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
          text: this.$i18n.t('events.headers.NAME'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$i18n.t('events.headers.TYPE'),
          align: 'left',
          sortable: true,
          value: 'type'
        },
        {
          text: this.$i18n.t('events.headers.START_TIME'),
          align: 'left',
          sortable: true,
          value: 'start'
        },
        {
          text: this.$i18n.t('events.headers.END_TIME'),
          align: 'left',
          sortable: true,
          value: 'end'
        }
      ]
    },
    items() {
      return this.$store.state.adminEvents.events
    },
    totalItems() {
      return this.$store.state.adminEvents.totalEvents
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
          await this.getEvents(
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
    ...mapActions(['getEvents', 'editEvent', 'saveEvent', 'deleteEvent']),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getEvents(
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
          await this.deleteEvent(item._id)
          await this.getEvents(
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
            await this.editEvent(this.editedItem)

            await this.getEvents(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveEvent({
              name: this.editedItem.name,
              info: this.editedItem.info,
              type: this.editedItem.type,
              start: this.editedItem.start,
              end: this.editedItem.end
            })
            await this.getEvents(
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
