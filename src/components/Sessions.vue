<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
          @click="e1 = 1"
          :complete="e1 > 1"
          step="1"
          editable
          edit-icon="mdi-calendar"
          color="secondary"
          >Choose Event</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step
          @click="e1 = 2"
          :complete="e1 > 2"
          step="2"
          editable
          edit-icon="mdi-account-supervisor"
          color="secondary"
          >Choose Mentee</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 3"
          step="3"
          :editable="isDataReady"
          @click="
            if (isDataReady) {
              e1 = 3
            }
          "
          edit-icon="mdi-send-clock"
          color="secondary"
          >Record Data</v-stepper-step
        >
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-col class="d-flex" cols="12" sm="12">
            <v-select
              :items="eventsInfo"
              :label="$t('sessions.addSession.CHOOSE_EVENT')"
              v-model="eventSelect"
              outlined
            ></v-select>
          </v-col>

          <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

          <!-- <v-btn text>Cancel</v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-col class="d-flex" cols="12" sm="12">
            <v-select
              :items="menteeInfo"
              :label="$t('sessions.addSession.CHOOSE_MENTEE')"
              v-model="menteeSelect"
              outlined
            ></v-select>
          </v-col>

          <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

          <v-btn text @click="e1 = 1">Go Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col cols="12">
              <v-subheader class="pl-0">Timer (Min)</v-subheader>
              <v-slider v-model="timeAmount" thumb-label :max="5" :min="1">
                <template v-slot:append>
                  <v-text-field
                    v-model="timeAmount"
                    class="mt-0 pt-0"
                    hide-details
                    disabled
                    single-line
                    type="number"
                    max="5"
                    min="1"
                    style="width: 60px;"
                  ></v-text-field> </template
              ></v-slider>
            </v-col>
            <v-col cols="12">
              <v-subheader class="pl-0">Get WPM</v-subheader>
              <div class="text-center">
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="secondary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="readWords = 0"
                    >
                      Start Recording
                    </v-btn>
                  </template>

                  <v-card>
                    <!-- eslint-disable vue/no-v-html -->
                    <v-card-title class="headline" primary-title>
                      Record WPM | {{ readWords }} words
                    </v-card-title>
                    <!--eslint-enable-->
                    <div
                      v-ripple
                      class="text-center elevation-2 pa-12 headline -moz-user-select: -moz-none; -khtml-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none;"
                      @click="readWords++"
                    >
                      Add Word
                    </div>
                    <div
                      v-ripple
                      class="text-center elevation-2 pa-12 headline -moz-user-select: -moz-none; -khtml-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none;"
                      @click="readWords--"
                    >
                      Delete Word
                    </div>

                    <v-divider></v-divider>
                    <v-progress-linear
                      buffer-value="0"
                      :value="timerIndicator"
                      stream
                    ></v-progress-linear>
                    <v-card-actions>
                      <v-btn color="success" text @click="recordPWM()">
                        Start
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="grey"
                        text
                        @click="
                          if (timer.status !== 'stopped') {
                            if (timer.status === 'running') {
                              timer.pause()
                            } else {
                              timer.resume()
                            }
                          }
                        "
                      >
                        Pause/Resume
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="error"
                        text
                        @click="
                          timer.stop()
                          timerIndicator = 0
                          dialog = false
                        "
                      >
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <h3>{{ wpm }} wpm</h3>
            </v-col>
            <v-col cols="12">
              <v-subheader class="pl-0">Comprehension Rate</v-subheader>
              <v-slider v-model="compAmount" thumb-label :max="100" :min="1"
                ><template v-slot:append>
                  <v-text-field
                    v-model="compAmount"
                    class="mt-0 pt-0"
                    hide-details
                    disabled
                    single-line
                    type="number"
                    max="100"
                    min="1"
                    style="width: 60px;"
                  ></v-text-field> </template
              ></v-slider>
            </v-col>
            <v-col cols="12">
              <v-subheader class="pl-0">Retention Rate</v-subheader>
              <v-slider v-model="retAmount" thumb-label :max="100" :min="1"
                ><template v-slot:append>
                  <v-text-field
                    v-model="retAmount"
                    class="mt-0 pt-0"
                    hide-details
                    disabled
                    single-line
                    type="number"
                    max="100"
                    min="1"
                    style="width: 60px;"
                  ></v-text-field> </template
              ></v-slider>
            </v-col>
            <v-col cols="12">
              <v-subheader class="pl-0">Notes</v-subheader>
              <v-text-field
                v-model="retNotes"
                class="mt-0 pt-0"
                hide-details
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- <v-btn color="secondary" @click="e1 = 1">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn> -->
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat } from '@/utils/utils.js'
const moment = require('moment')
// const Timer = require('tiny-timer')
import Timer from 'tiny-timer'
// const timerTest = new Timer()
// title: this.$store.getters.appTitle,
export default {
  metaInfo() {
    return {
      title: 'COOL',
      titleTemplate: `${this.$t('sessions.TITLE')} - %s`
    }
  },
  data() {
    return {
      e1: 1,
      menteeSelect: '',
      eventSelect: '',
      timerLabels: ['1', '2', '3', '4', '5'],
      timeAmount: 0,
      compAmount: 0,
      retAmount: 0,
      retNotes: '',
      dialog: false,
      readWords: 0,
      timerIndicator: 0,
      timer: 'global',
      wpm: 0
    }
  },
  created() {},
  destroyed() {},
  computed: {
    classInfo() {
      return this.$store.state.sessions.available_session_data.classInfo
    },
    events() {
      return this.$store.state.sessions.available_session_data.events
    },
    eventsInfo() {
      const availEvents = this.$store.state.sessions.available_session_data
        .events
      const ret = []
      if (availEvents !== undefined) {
        availEvents.forEach((element) => {
          if (
            moment().isBetween(
              element.start,
              moment(element.end).add(0, 'days')
            )
          ) {
            ret.push({
              text: `${element.name} | ${moment(element.start).format(
                'MM/DD/YY'
              )} - ${moment(element.end).format('MM/DD/YY')}`,
              value: element._id
            })
          }
        })
      }
      return ret
    },
    menteeInfo() {
      const availMentee = this.$store.state.sessions.available_session_data
        .classInfo
      const ret = []
      if (availMentee !== undefined) {
        availMentee.forEach((element) => {
          ret.push({
            text: element.mentorships.mentee[0].name,
            value: element.mentorships.mentee[0]._id
          })
        })
      }
      return ret
    },
    isDataReady() {
      if (this.menteeSelect !== '' && this.eventSelect !== '') {
        return true
      }
      return false
    }
  },
  async mounted() {
    await this.getAvailableSessions()
    this.timer = new Timer()
  },
  methods: {
    ...mapActions([
      'addAttendance',
      'delAttendance',
      'getAttendance',
      'saveSession',
      'getAvailableSessions'
    ]),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    async updateCurrentSessionInfo() {
      const getInfo = await this.saveSession({
        mentor: this.$store.state.auth.user._id,
        mentee: this.menteeSelect,
        event: this.eventSelect
      })
      return getInfo
    },
    goToStep(num) {
      this.e1 = num
      return num
    },
    recordPWM() {
      /*eslint-disable*/
      this.timer.stop()
      this.timer.start(1000 * 60 * this.timeAmount)
      this.timer.on(
        'tick',
        (ms) =>
          (this.timerIndicator =
            100 - (this.timer.time / this.timer.duration) * 100)
      )
      this.timer.on('done', () => {
        this.wpm = this.readWords / this.timeAmount
        this.dialog = false
      })

      /* eslint-enable*/
    }
  },
  watch: {
    eventsInfo(val, oldVal) {
      if (val.length === 1) {
        this.eventSelect = val[0].value
        this.goToStep(2)
      }
    },
    menteeInfo(val, oldVal) {
      if (val.length === 1) {
        this.menteeSelect = val[0].value
        this.e1 = 3
      }
    },
    /*eslint-disable*/
    async e1(val, oldVal) {
      if (val === 3) {
        if (this.eventSelect === '' || this.menteeSelect === '') {
          if (this.eventSelect === '') {
            this.goToStep(1)
          } else {
            this.goToStep(2)
          }
        } else {
          await this.updateCurrentSessionInfo()
          if (
            this.$store.state.sessions.save_session_return.comprehension !==
            undefined
          ) {
            this.compAmount = this.$store.state.sessions.save_session_return.comprehension
          }
          if (
            this.$store.state.sessions.save_session_return.retention !==
            undefined
          ) {
            this.retAmount = this.$store.state.sessions.save_session_return.retention
          }
          if (
            this.$store.state.sessions.save_session_return.note !== undefined
          ) {
            this.retNotes = this.$store.state.sessions.save_session_return.note
          }
          if (
            this.$store.state.sessions.save_session_return.reading !== undefined
          ) {
            this.wpm = this.$store.state.sessions.save_session_return.reading
          }
        }
      }
    },
    /* eslint-enable*/
    compAmount(val, oldVal) {
      this.saveSession({
        mentor: this.$store.state.auth.user._id,
        mentee: this.menteeSelect,
        event: this.eventSelect,
        comprehension: val
      })
    },
    retAmount(val, oldVal) {
      this.saveSession({
        mentor: this.$store.state.auth.user._id,
        mentee: this.menteeSelect,
        event: this.eventSelect,
        retention: val
      })
    },
    wpm(val, oldVal) {
      this.saveSession({
        mentor: this.$store.state.auth.user._id,
        mentee: this.menteeSelect,
        event: this.eventSelect,
        reading: val
      })
    },
    retNotes(val, oldVal) {
      this.saveSession({
        mentor: this.$store.state.auth.user._id,
        mentee: this.menteeSelect,
        event: this.eventSelect,
        note: val
      })
    }
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
