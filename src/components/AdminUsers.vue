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
          <!-- <v-flex xs12 sm12 md4 mt-3 pl-4>
            <div class="text-left">
              <v-toolbar-title>{{ $t('users.TITLE') }}</v-toolbar-title>
            </div>
          </v-flex> -->
          <v-row dense style="margin: 10px 10px -10px 10px">
            <v-col cols="12" sm="12" md="2" al>
              <div class="text-left">
                <v-toolbar-title>{{ $t('users.TITLE') }}</v-toolbar-title>
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
          <!-- <v-flex xs12 sm6 md4 px-3>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('dataTable.SEARCH')"
              id="search"
              single-line
              hide-details
              clearable
              clear-icon="mdi-close"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 md3 px-3>
            <v-combobox
              v-model="select"
              :items="items"
              label="Select a favorite activity or create a new one"
              multiple
            ></v-combobox>
          </v-flex> -->
          <v-flex xs12 sm3 md2 text-xs-right mb-2 mt-2 pr-2>
            <ValidationObserver
              ref="observer"
              v-slot="{ invalid }"
              tag="form"
              @submit.prevent="submit()"
            >
              <v-dialog
                v-model="dialog"
                max-width="800px"
                content-class="dlgNewEditItem"
              >
                <template v-slot:activator="{ on }">
                  <div class="text-right">
                    <v-btn color="secondary" v-on="on" class="btnNewItem pr-4">
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
                          <v-flex xs12 md4>
                            <label for="createdAt">{{
                              $t('common.CREATED')
                            }}</label>
                            <div name="createdAt">
                              {{ getFormat(editedItem.createdAt) }}
                            </div>
                          </v-flex>
                          <v-flex xs12 md4>
                            <label for="updatedAt">{{
                              $t('common.UPDATED')
                            }}</label>
                            <div name="updatedAt">
                              {{ getFormat(editedItem.updatedAt) }}
                            </div>
                          </v-flex>
                          <v-flex xs12 md4>
                            <label for="verified">{{
                              $t('users.headers.VERIFIED')
                            }}</label>
                            <div
                              name="verified"
                              v-html="trueFalse(editedItem.verified)"
                            ></div>
                          </v-flex>
                        </template>
                        <v-flex xs12 md6>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              id="name"
                              name="name"
                              v-model="editedItem.name"
                              :label="$t('users.headers.NAME')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 md6>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              id="username"
                              name="username"
                              v-model="editedItem.username"
                              :label="$t('users.headers.USERNAME')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 md6>
                          <ValidationProvider
                            rules="required|email"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              id="email"
                              name="email"
                              type="email"
                              v-model="editedItem.email"
                              :label="$t('users.headers.EMAIL')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <template v-if="!editedItem._id">
                          <v-flex xs12 md6>
                            <ValidationProvider
                              rules="required|min:5"
                              v-slot="{ errors }"
                              vid="password"
                            >
                              <v-text-field
                                id="password"
                                name="password"
                                type="password"
                                :label="$t('users.PASSWORD')"
                                v-model="editedItem.password"
                                :error="errors.length > 0"
                                :error-messages="errors[0]"
                                key="password"
                                ref="password"
                                autocomplete="off"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-flex>
                          <v-flex xs12 md6>
                            <ValidationProvider
                              rules="required|min:5|confirmed:password"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                :label="$t('users.CONFIRM_PASSWORD')"
                                v-model="editedItem.confirmPassword"
                                :error="errors.length > 0"
                                :error-messages="errors[0]"
                                key="confirmPassword"
                                autocomplete="off"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-flex>
                        </template>
                        <v-flex xs12 md6>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              clearable
                              id="role"
                              name="role"
                              v-model="editedItem.role"
                              :items="roles"
                              item-text="name"
                              item-value="value"
                              :label="$t('users.headers.ROLE')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              class="inputRole"
                            ></v-select>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                          v-if="
                            editedItem.role === 'admin' ||
                            editedItem.role === 'mentor'
                              ? 'required'
                              : ''
                          "
                        >
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              id="uin"
                              name="uin"
                              type="tel"
                              v-model="editedItem.uin"
                              :label="$t('users.headers.UIN')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                          v-if="
                            editedItem.role === 'admin' ||
                            editedItem.role === 'mentor'
                              ? 'required'
                              : ''
                          "
                        >
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              id="card"
                              name="card"
                              type="text"
                              v-model="editedItem.card"
                              :label="$t('users.headers.CARD')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                          v-if="
                            editedItem.role === 'admin' ||
                            editedItem.role === 'mentor'
                              ? 'required'
                              : ''
                          "
                        >
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              id="phone"
                              name="phone"
                              type="number"
                              v-model="editedItem.phone"
                              :label="$t('users.headers.PHONE')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex
                          xs12
                          md12
                          v-if="
                            editedItem.role === 'admin' ||
                            editedItem.role === 'mentor'
                              ? 'required'
                              : ''
                          "
                        >
                          <ValidationProvider rules="" v-slot="{ errors }">
                            <v-text-field
                              id="info"
                              name="info"
                              type="text"
                              v-model="editedItem.info"
                              :label="$t('users.headers.INFO')"
                              :error="errors.length > 0"
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
                      color="green"
                      text
                      @click="save"
                      :disabled="invalid"
                      class="btnSave"
                      >{{ $t('dataTable.SAVE') }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </ValidationObserver>
          </v-flex>
        </v-layout>
      </template>
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ roleName(props.item.role) }}</td>
        <td v-html="trueFalse(props.item.verified)"></td>
        <td>{{ props.item.uin }}</td>
        <td>{{ props.item.card }}</td>
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.phone }}</td>
        <td>{{ props.item.info }}</td>
      </template>
      <template v-slot:item._id="{ item }">
        <td class="fill-height px-0">
          <v-layout class="justify-center">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  id="edit"
                  icon
                  class="mx-0"
                  v-on="on"
                  @click="editItem(item)"
                  color="primary"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('dataTable.EDIT') }}</span>
            </v-tooltip>
            <!-- <v-tooltip top>
              <template v-slot:activator="{ scan }">
                <v-btn
                  id="addCard"
                  icon
                  class="mx-0"
                  v-on="scan"
                  @click="addCard(item)"
                >
                  <v-icon>mdi-card-account-details</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('dataTable.ADDCARD') }}</span>
            </v-tooltip> -->
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  id="delete"
                  icon
                  class="mx-0"
                  color="secondary"
                  v-on="on"
                  @click="deleteItem(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('dataTable.DELETE') }}</span>
            </v-tooltip>
          </v-layout>
        </td>
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
      titleTemplate: `${this.$t('users.TITLE')} - %s`
    }
  },
  data() {
    return {
      searchInput: '',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['name', 'username'],
      searchFields: ['name', 'username', 'email', 'role', 'uin', 'card']
    }
  },
  computed: {
    roles() {
      return [
        { name: this.$t('roles.ADMIN'), value: 'admin' },
        { name: this.$t('roles.TEACHER'), value: 'teacher' },
        { name: this.$t('roles.MENTOR'), value: 'mentor' },
        { name: this.$t('roles.MENTEE'), value: 'mentee' },
        { name: this.$t('roles.USER'), value: 'user' }
      ]
    },
    isMentorOrAdmin(role) {
      return role === 'user' || role === 'mentor' ? 'required' : ''
    },
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
          text: this.$i18n.t('users.headers.NAME'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$i18n.t('users.headers.USERNAME'),
          align: 'left',
          sortable: true,
          value: 'username'
        },
        {
          text: this.$i18n.t('users.headers.EMAIL'),
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: this.$i18n.t('users.headers.ROLE'),
          align: 'left',
          sortable: true,
          value: 'role'
        },
        {
          text: this.$i18n.t('users.headers.STATUS'),
          align: 'left',
          sortable: true,
          value: 'status'
        },
        {
          text: this.$i18n.t('users.headers.UIN'),
          align: 'left',
          sortable: true,
          value: 'uin'
        },
        {
          text: this.$i18n.t('users.headers.INFO'),
          align: 'left',
          sortable: true,
          value: 'info'
        }
        // {
        //   text: this.$i18n.t('users.headers.CARD'),
        //   align: 'left',
        //   sortable: true,
        //   value: 'card'
        // },
        // {
        //   text: this.$i18n.t('common.CREATED'),
        //   align: 'left',
        //   sortable: true,
        //   value: 'createdAt'
        // },
        // {
        //   text: this.$i18n.t('common.UPDATED'),
        //   align: 'left',
        //   sortable: true,
        //   value: 'updatedAt'
        // }
      ]
    },
    items() {
      return this.$store.state.adminUsers.users
    },
    totalItems() {
      return this.$store.state.adminUsers.totalUsers
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
          await this.getUsers(
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
    search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    },
    fieldsToSearch() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    }
  },
  methods: {
    ...mapActions(['getUsers', 'editUser', 'saveUser', 'deleteUser']),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    roleName(value) {
      return value === 'admin' ? this.$t('roles.ADMIN') : this.$t('roles.USER')
    },
    trueFalse(value) {
      return value
        ? '<i aria-hidden="true" class="v-icon mdi mdi-check green--text" style="font-size: 16px;"></i>'
        : '<i aria-hidden="true" class="v-icon mdi mdi-close red--text" style="font-size: 16px;"></i>'
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getUsers(
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
    addCard(item) {
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
            buttonFalseColor: 'yellow'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.deleteUser(item._id)
          await this.getUsers(
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
      try {
        this.dataTableLoading = true
        // Updating item
        if (this.editedItem._id) {
          await this.editUser(this.editedItem)
          await this.getUsers(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        } else {
          // Creating new item
          await this.saveUser({
            name: this.editedItem.name,
            email: this.editedItem.email,
            username: this.editedItem.username,
            password: this.editedItem.password,
            role: this.editedItem.role,
            phone: this.editedItem.phone,
            card: this.editedItem.card,
            uin: this.editedItem.uin,
            info: this.editedItem.info,
            status: 'verified'
          })
          await this.getUsers(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        }
        this.close()
        return
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
      }
    }
  },
  async mounted() {}
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
