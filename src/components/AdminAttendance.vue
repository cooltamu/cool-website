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
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab :key="sAdd">
        Scan Add
      </v-tab>
      <v-tab :key="sDel">
        Scan Delete
      </v-tab>
      <v-tab :key="addDel">
        Add/Delete
      </v-tab>
      <v-tab :key="vAtt">
        View Attendees
      </v-tab>

      <v-tab-item>
        Scan Add
      </v-tab-item>
      <v-tab-item>
        Scan Delete
      </v-tab-item>
      <v-tab-item>
        Add/Delete
      </v-tab-item>
      <v-tab-item>
        View Attendees
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
    return {}
  },
  created() {
    let buffer = []
    /* eslint-disable */
    document.addEventListener('keydown', (event) => {
      // const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const key = event.key.toLowerCase()

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
          console.log(this)
          if(this.tab == 0){
              this.addAttendee(str, this.$route.params.id)
          }
          else if(this.tab == 1){
              this.delAttendee(str, this.$route.params.id)
          }
        }
      }
    })
  },
  computed: {

  },
  watch: {},
  methods: {
    ...mapActions(['addAttendance', 'delAttendance']),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    async addAttendee(str, id) {
        try {
            // Creating payload
            await this.addAttendance({
              _id: id,
              eventId: id,
              card: str
            })
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
            console.log("something went wrong")
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
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
            console.log("something went wrong deleting")
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
