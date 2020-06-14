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
          <v-row dense>
            <v-col cols="12" sm="12" md="2" al>
              <div class="text-left">
                <v-toolbar-title>{{ $t('sessions.TITLE') }}</v-toolbar-title>
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
                <!-- <template v-slot:activator="{ on }">
                  <div class="text-right">
                    <v-btn color="secondary" v-on="on" class="btnNewItem">
                      <v-icon class="mr-2">mdi-plus</v-icon>
                      {{ $t('dataTable.NEW_ITEM') }}
                    </v-btn>
                  </div>
                </template> -->
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
                        <template>
                          <v-flex xs12>
                            <ValidationProvider
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                required
                                id="reading"
                                name="reading"
                                v-model="editedItem.reading"
                                :label="$t('sessions.headers.READING')"
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
                                id="comprehension"
                                name="comprehension"
                                v-model="editedItem.comprehension"
                                :label="$t('sessions.headers.COMPREHENSION')"
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
                                id="retention"
                                name="retention"
                                v-model="editedItem.retention"
                                :label="$t('sessions.headers.RETENTION')"
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
                                id="note"
                                name="note"
                                v-model="editedItem.note"
                                :label="$t('sessions.headers.NOTE')"
                                :error="errors.length > 0"
                                :error-messages="errors[0]"
                                autocomplete="off"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-flex>
                        </template>
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
            <!-- <template v-slot:activator="{ on }">
              <v-btn id="view" icon v-on="on" :to="'events/' + item._id">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template> -->
            <span>{{ $t('dataTable.VIEW') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn id="edit" icon v-on="on" @click="editItem(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('dataTable.EDIT') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn id="delete" icon v-on="on" @click="deleteItem(item)">
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
      fieldsToSearch: ['event.name'],
      searchFields: [
        'event.name',
        'mentor.name',
        'mentor.card',
        'mentee.name',
        'note'
      ]
    }
  },
  async created() {
    await this.getAllSessions(
      buildPayloadPagination(this.pagination, this.buildSearch())
    )
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
          text: this.$i18n.t('sessions.headers.EVENT'),
          align: 'left',
          sortable: true,
          value: 'event[0].name'
        },
        {
          text: this.$i18n.t('sessions.headers.MENTEE'),
          align: 'left',
          sortable: true,
          value: 'mentee[0].name'
        },
        {
          text: this.$i18n.t('sessions.headers.MENTOR'),
          align: 'left',
          sortable: true,
          value: 'mentor[0].name'
        },
        {
          text: this.$i18n.t('sessions.headers.NOTE'),
          align: 'left',
          sortable: true,
          value: 'note'
        },
        {
          text: this.$i18n.t('sessions.headers.READING'),
          align: 'left',
          sortable: true,
          value: 'reading'
        },
        {
          text: this.$i18n.t('sessions.headers.COMPREHENSION'),
          align: 'left',
          sortable: true,
          value: 'comprehension'
        },
        {
          text: this.$i18n.t('sessions.headers.RETENTION'),
          align: 'left',
          sortable: true,
          value: 'retention'
        }
      ]
    },
    items() {
      return this.$store.state.sessions.session_data
    },
    totalItems() {
      return this.$store.state.sessions.total_session_data
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
          await this.getAllSessions(
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
    ...mapActions(['getAllSessions', 'saveSession', 'deleteSession']),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getAllSessions(
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

          await this.deleteSession({ id: item._id })
          await this.getAllSessions(
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
    /*eslint-disable */
    async save() {
      // eslint-ignore
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        try {
          this.dataTableLoading = true
          // Updating item

          const mentorId = this.editedItem.mentor[0]._id
          const menteeId = this.editedItem.mentee[0]._id
          const eventId = this.editedItem.event[0]._id
          await this.saveSession({
            reading: this.editedItem.reading,
            comprehension: this.editedItem.comprehension,
            retention: this.editedItem.retention,
            note: this.editedItem.note,
            mentor: mentorId,
            mentee: menteeId,
            event: eventId
          })
          await this.getAllSessions(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false

          this.close()
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.dataTableLoading = false
          this.close()
        }
      }
    }
    /* eslint-enable */
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
