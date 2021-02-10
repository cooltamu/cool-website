<template>
  <div>
    <v-snackbar v-model="alert" :multi-line="true" :timeout="7500">
      {{ alertText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="alert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
              <v-toolbar-title>{{ $t('books.TITLE') }}</v-toolbar-title>
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
                          <v-flex xs12 md6>
                            <label for="cover">{{ $t('books.COVER') }}</label>
                            <div name="cover">
                              <v-img
                                :src="`http://covers.openlibrary.org/b/isbn/${editedItem.isbn}-M.jpg`"
                                :lazy-src="`http://covers.openlibrary.org/b/isbn/${editedItem.isbn}-S.jpg`"
                                class="grey lighten-2"
                              >
                                <template v-slot:placeholder>
                                  <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-progress-circular
                                      indeterminate
                                      color="grey lighten-5"
                                    ></v-progress-circular>
                                  </v-row>
                                </template>
                              </v-img>
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
                              id="title"
                              name="title"
                              v-model="editedItem.title"
                              :label="$t('books.headers.TITLE')"
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
                              id="notes"
                              name="notes"
                              v-model="editedItem.notes"
                              :label="$t('books.headers.NOTES')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required|numeric"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              required
                              id="isbn"
                              name="isbn"
                              v-model="editedItem.isbn"
                              label="ISBN"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 v-if="editedItem._id">
                          <FindCollection
                            v-model="editedItem.donor"
                            label="Donor"
                            storeItem="users"
                            storeName="adminUsers"
                            text="name"
                            getterFunction="getUsers"
                          ></FindCollection>
                        </v-flex>
                        <v-flex xs12 v-if="editedItem._id">
                          <FindCollections
                            v-model="editedItem.history"
                            label="Library History"
                            storeItem="libraries"
                            storeName="adminLibrary"
                            text="name"
                            getterFunction="getLibraries"
                          ></FindCollections>
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
          <v-flex xs12 sm6 md4 mb-2 mt-2 pr-2>
            <v-dialog
              v-model="dialogScanBook"
              fullscreen
              content-class="dlgNewEditItem"
            >
              <template v-slot:activator="{ on }">
                <div class="text-right">
                  <v-btn color="secondary" v-on="on" class="btnNewItem">
                    <v-icon class="mr-2">mdi-scan</v-icon>
                    {{ $t('books.SCAN_BOOKS') }}
                  </v-btn>
                </div>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Scan Book: {{ scanDataISBN }}</span>
                </v-card-title>
                <v-quagga
                  :onDetected="scannedBook"
                  :readerTypes="['ean_reader']"
                ></v-quagga>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red lighten3"
                    text
                    @click="closeDialogScanBook"
                    class="btnCancel"
                    >{{ $t('dataTable.CANCEL') }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </template>
      <template v-slot:item._id="{ item }">
        <v-layout class="justify-center">
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
      <template v-slot:item.history="{ item }">
        <v-layout class="justify-center">
          {{ item.history[0] }}
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
      titleTemplate: `${this.$t('books.TITLE')} - %s`
    }
  },
  data() {
    return {
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      dialogScanBook: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['name', 'notes'],
      scanDataISBN: 'Not Scanned Yet',
      scannedBookISBNArr: [],
      alert: false,
      alertText: 'No Message'
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
          text: this.$i18n.t('books.headers.TITLE'),
          align: 'left',
          sortable: true,
          value: 'title'
        },
        {
          text: this.$i18n.t('books.headers.NOTES'),
          align: 'left',
          sortable: true,
          value: 'notes'
        },
        {
          text: this.$i18n.t('books.headers.ISBN'),
          align: 'left',
          sortable: true,
          value: 'isbn'
        },
        {
          text: this.$i18n.t('books.headers.LOCATION'),
          value: 'history',
          sortable: false,
          width: 100
        }
      ]
    },
    items() {
      return this.$store.state.adminBook.books
    },
    totalItems() {
      return this.$store.state.adminBook.totalBooks
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
          await this.getBooks(
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
    ...mapActions(['getBooks', 'editBook', 'saveBook', 'deleteBook']),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getBooks(
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
    async scannedBook(data) {
      console.log('scanned', data)
      if (
        data.codeResult.code &&
        this.dialogScanBook &&
        !this.scannedBookISBNArr.includes(data.codeResult.code)
      ) {
        this.scannedBookISBNArr.push(data.codeResult.code)
        this.scanDataISBN = data.codeResult.code
        this.editedItem.isbn = this.scanDataISBN
        const ISBNAPIURL = `https://openlibrary.org/isbn/${this.editedItem.isbn}.json`

        await fetch(ISBNAPIURL)
          .then((response) => response.json())
          .then((jsonData) => {
            if (jsonData.full_title) {
              this.editedItem.title = jsonData.full_title
            } else {
              this.editedItem.title = jsonData.title
            }
            this.customAlert(`The book scanned is ${this.editedItem.title}!`)
            this.save()
          })
      }
    },
    customAlert(msg) {
      this.alertText = msg
      this.alert = true
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
          await this.deleteBook(item._id)
          await this.getBooks(
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
    closeDialogScanBook() {
      this.dialogScanBook = false
    },
    async save() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        try {
          this.dataTableLoading = true
          // Updating item
          if (this.editedItem._id) {
            await this.editBook(this.editedItem)

            await this.getBooks(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveBook({
              title: this.editedItem.title,
              notes: this.editedItem.notes,
              isbn: this.editedItem.isbn
            })
            await this.getBooks(
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
