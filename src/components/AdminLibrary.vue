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
              <v-toolbar-title>{{ $t('libraries.TITLE') }}</v-toolbar-title>
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
            <div class="text-left">
              <v-btn color="secondary" to="library/books" class="btnNewItem">
                <v-icon class="mr-2">mdi-book</v-icon>
                {{ $t('libraries.GO_TO_BOOKS') }}
              </v-btn>
            </div>
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
                              :label="$t('libraries.headers.NAME')"
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
                              id="identifier"
                              name="identifier"
                              v-model="editedItem.identifier"
                              :label="$t('libraries.headers.IDENTIFIER')"
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
                              :label="$t('libraries.headers.INFO')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required|decimal"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              required
                              id="Longitude"
                              name="longitude"
                              v-model="editedItem.location.coordinates[0]"
                              label="longitude"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required|decimal"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              required
                              id="Latitude"
                              name="latitude"
                              v-model="editedItem.location.coordinates[1]"
                              label="latitude"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
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
                :to="'library/' + item._id"
                color="accent"
              >
                <v-icon>mdi-book-open-page-variant</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('libraries.CATALOG') }}</span>
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
      <template v-slot:item._maps="{ item }">
        <v-layout class="justify-center">
          <v-tooltip top>
            <!-- eslint-disable -->
            <template v-slot:activator="{ on }">
              <v-btn
                id="view"
                icon
                v-on="on"
                color="accent"
                @click="openAppleMaps(item)"
              >
                <v-icon>mdi-apple</v-icon>
              </v-btn>
            </template>
            <span>{{ 'Apple ' + $t('dataTable.MAPS') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <!-- eslint-disable -->
            <template v-slot:activator="{ on }">
              <v-btn
                id="view"
                icon
                v-on="on"
                color="accent"
                @click="openGoogleMaps(item)"
              >
                <v-icon>mdi-google-maps</v-icon>
              </v-btn>
            </template>
            <span>{{ 'Google ' + $t('dataTable.MAPS') }}</span>
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
      titleTemplate: `${this.$t('libraries.TITLE')} - %s`
    }
  },
  data() {
    return {
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: { location: { coordinates: [0, 0] } },
      defaultItem: {},
      fieldsToSearch: ['name', 'info']
    }
  },
  computed: {
    formTitle() {
      return this.editedItem._id
        ? this.$t('dataTable.EDIT_ITEM')
        : this.$t('dataTable.NEW_ITEM')
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
          text: this.$i18n.t('libraries.headers.NAME'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$i18n.t('libraries.headers.IDENTIFIER'),
          align: 'left',
          sortable: true,
          value: 'identifier'
        },
        {
          text: this.$i18n.t('libraries.headers.INFO'),
          align: 'left',
          sortable: true,
          value: 'info'
        },
        {
          text: this.$i18n.t('dataTable.MAPS'),
          value: '_maps',
          sortable: false,
          width: 100
        }
      ]
    },
    items() {
      return this.$store.state.adminLibrary.libraries
    },
    totalItems() {
      return this.$store.state.adminLibrary.totalLibraries
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
          await this.getLibraries(
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
    ...mapActions([
      'getLibraries',
      'editLibrary',
      'saveLibrary',
      'deleteLibrary'
    ]),
    openGoogleMaps(item) {
      window.open(
        `http://www.google.com/maps/place/${item.location.coordinates[1]},${item.location.coordinates[0]}`,
        '_blank'
      )
    },
    openAppleMaps(item) {
      window.open(
        `http://maps.apple.com/?sll=${item.location.coordinates[1]},${item.location.coordinates[0]}`,
        '_blank'
      )
    },
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getLibraries(
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
          await this.deleteLibrary(item._id)
          await this.getLibraries(
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
            await this.editLibrary(this.editedItem)

            await this.getLibraries(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveLibrary({
              name: this.editedItem.name,
              info: this.editedItem.info,
              identifier: this.editedItem.identifier,
              location: {
                coordinates: [
                  this.editedItem.location.coordinates[0],
                  this.editedItem.location.coordinates[1]
                ]
              }
            })
            await this.getLibraries(
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
