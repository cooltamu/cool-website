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
      cardSwipeListener: undefined
    }
  },
  created() {
    document.addEventListener('keydown', this.registerKeyStrokes)
  },
  destroyed() {
    document.removeEventListener('keydown', this.registerKeyStrokes)
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions(['addAttendance', 'delAttendance']),
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
    tabHandler(value) {}
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
