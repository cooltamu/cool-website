<!-- <template>
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
</template> -->
<!-- When using v-tab-item's that contain required input fields you must use the eager prop in order to validate the required fields that are not yet visible. -->
<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
      v-on:change="tabHandler"
    >
      <v-tab>
        Scan Add
      </v-tab>
      <v-tab>
        Scan Delete
      </v-tab>
      <v-tab>
        View Attendees
      </v-tab>
      <v-tab>
        Info?
      </v-tab>

      <v-tab-item>
        <h1>{{ sAdd }}</h1>
        <ErrorMessage />
        <SuccessMessage />
      </v-tab-item>
      <v-tab-item>
        <h1>{{ sDel }}</h1>
        <ErrorMessage />
        <SuccessMessage />
      </v-tab-item>
      <v-tab-item>
        <h1>View Attendees</h1>
        <v-container>
          <v-data-iterator
            :items="attendees"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            :sort-desc="sortDesc"
            hide-default-footer
          >
            <template v-slot:header>
              <v-row dense class="px-4 my-4">
                <v-col cols="6" sm="6" md="6">
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
                <v-col cols="6" sm="6" md="3">
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
                <v-col cols="6" sm="6" md="2">
                  <v-btn-toggle v-model="sortDesc" mandatory>
                    <v-btn large depressed :value="false" class="dense-button">
                      <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn large depressed :value="true" class="dense-button">
                      <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col cols="6" sm="6" md="1">
                  <v-btn large class="dense-button" v-on:click="tabHandler(2)">
                    <v-icon dark>mdi-refresh</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </template>
            <template v-slot:default="props">
              <v-row no-gutters>
                <v-col
                  v-for="item in props.items"
                  :key="item._id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card class="ma-4" max-width="500">
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-subtitle>{{
                      `Username: ${item.username}`
                    }}</v-card-subtitle>
                    <!--
                    <v-card-text class="card-info-item">
                      {{ item.schedule }}
                    </v-card-text>
                    <v-card-text class="card-info-item">
                      {{ item.location }}
                    </v-card-text>
                    <v-card-text class="card-info-item">
                      {{ item.info }}
                    </v-card-text> -->
                    <!-- <div class="card-spacer" /> -->
                    <v-card-actions>
                      <v-btn
                        color="red"
                        class="action-button"
                        text
                        v-on:click="handleToggleButtons(item, false)"
                        >Absent</v-btn
                      >
                      <v-switch
                        value
                        :input-value="item.present"
                        v-on:click="handleToggle(item)"
                      ></v-switch>
                      <v-btn
                        color="green"
                        class="action-button"
                        text
                        v-on:click="handleToggleButtons(item, true)"
                      >
                        Present
                      </v-btn>

                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <h1>Info</h1>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat } from '@/utils/utils.js'
// title: this.$store.getters.appTitle,
export default {
  metaInfo() {
    return {
      title: this.$route.params.id,
      titleTemplate: `${this.$t('events.TITLE')} - %s`
    }
  },
  data() {
    return {
      sAdd: 'No Card Swiped Yet.',
      sDel: 'No Card Swiped Yet.',
      tab: 0,
      buffer: [],
      cardSwipeListener: undefined,
      search: '',
      sortBy: 'name',
      keys: ['name', 'username', 'email'],
      filter: {},
      sortDesc: false
    }
  },
  created() {
    document.addEventListener('keydown', this.registerKeyStrokes)
  },
  destroyed() {
    document.removeEventListener('keydown', this.registerKeyStrokes)
  },
  computed: {
    attendees() {
      return this.$store.state.adminAttendance.totalAttendance
    }
  },
  async mounted() {
    await this.getAttendance({
      _id: this.$route.params.id,
      eventId: this.$route.params.id
    })
    console.log(this)
  },
  watch: {},
  methods: {
    ...mapActions(['addAttendance', 'delAttendance', 'getAttendance']),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    /* eslint-disable */
    registerKeyStrokes(event) {
      {
        // const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const key = event.key.toLowerCase()

        // // we are only interested in alphanumeric keys
        // if (charList.indexOf(key) === -1) return;

        this.buffer.push(key)
        // console.log(buffer);
        let minusIndex = -1
        let periodIndex = -1
        if (key === 'enter') {
          for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i] === '-') {
              minusIndex = i
            }
            if (this.buffer[i] === '.') {
              periodIndex = i
            }
          }
          if (minusIndex === -1 && periodIndex === -1) {
            this.buffer = []
          } else {
            let str = ''
            for (let i = minusIndex; i < this.buffer.length - 1; i++) {
              if (this.buffer[i] !== 'shift') {
                str += this.buffer[i]
              }
            }
            if (this.tab == 0) {
              this.addAttendee(str, this.$route.params.id)
            } else if (this.tab == 1) {
              this.delAttendee(str, this.$route.params.id)
            }
          }
        }
      }
    },
    async addAttendee(str, id) {
      try {
        // Creating payload
        await this.addAttendance({
          _id: id,
          eventId: id,
          card: str
        })
        this.sAdd = `User Swiped Name: ${this.$store.swipedUserData.data.name}`

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.sAdd = 'Swipe Failed'
        //  console.log((this.$store.state.error.errorMessage = 'SWIPE_FAILED'))
        //  this.$store.state.error.errorMessage = 'SWIPE_FAILED'
        // setTimeout(function () {
        //   this.$store.state.error.showErrorMessage = false
        // }, 2000)
        return undefined
      }
    },
    async delAttendee(str, id) {
      try {
        // Creating payload
        await this.delAttendance({
          _id: id,
          eventId: id,
          card: str
        })
        this.sDel = `User Swiped Name: ${this.$store.swipedUserData.data.name}`
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.sDel = 'Swipe Failed'
        //  this.$store.state.error.errorMessage = 'SWIPE_FAILED'
        // setTimeout(function () {
        //   this.$store.state.error.showErrorMessage = false
        // }, 2000)
        return undefined
      }
    },
    async handleToggle(user) {
      console.log(user)
      if (user.present == true) {
        await this.delAttendance({
          _id: this.$route.params.id,
          eventId: this.$route.params.id,
          username: user.username
        })
        user.present = false
      } else {
        await this.addAttendance({
          _id: this.$route.params.id,
          eventId: this.$route.params.id,
          username: user.username
        })
        user.present = true
      }
    },
    async handleToggleButtons(user, val) {
      console.log(user)
      if (!val) {
        await this.delAttendance({
          _id: this.$route.params.id,
          eventId: this.$route.params.id,
          username: user.username
        })
        user.present = false
      } else {
        await this.addAttendance({
          _id: this.$route.params.id,
          eventId: this.$route.params.id,
          username: user.username
        })
        user.present = true
      }
    },
    tabHandler(value) {
      if (value == '2') {
        this.getAttendance({
          _id: this.$route.params.id,
          eventId: this.$route.params.id
        })
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
