<template>
  <v-container fluid>
    <v-layout row wrap>
      <h1 class="display-3" v-if="!submitNot">Thank you for your response.</h1>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
        v-if="submitNot"
      >
        <v-card-title>
          <span class="headline">Meeting Attendance</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  name="Name"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="Name*"
                    v-model="name"
                    :error-messages="errors"
                    :success="validator"
                    hint="First and Last name"
                    persistent-hint
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12">
                <ValidationProvider
                  name="NetId"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="NetID*"
                    v-model="netID"
                    :error-messages="errors"
                    hint="NetID is the first half of your TAMU email!"
                    :success="validator"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" text @click="Submit()" :disabled="invalid"
            >Submit</v-btn
          >
        </v-card-actions>
      </ValidationObserver>
      <v-snackbar v-model="alert" :multi-line="true" :timeout="7500">
        {{ alertText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="alert = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'App',

  components: {},
  created() {},
  methods: {
    Submit() {
      const d = new Date()
      const meetingDate = `${
        d.getMonth() + 1
      }-${d.getDate()}-${d.getFullYear()}`
      /* eslint consistent-this: [2, "vueApp"]*/
      const vueApp = this
      fetch(
        `https://docs.google.com/forms/d/e/1FAIpQLSfHmNA68nGQPL4GJKWGDw-nm1oaozpuJuT64M0m_5q1oSVjSg/formResponse?usp=pp_url&entry.851955314=${this.name}&entry.1373272653=${this.netID}&entry.2114178089=${meetingDate}`,
        { mode: 'no-cors', method: 'POST' }
      ).then((response) => {
        vueApp.submitNot = false
        vueApp.customAlert(
          `Thank you for your Attendance submission ${vueApp.name}!`
        )
      })
    },
    customAlert(msg) {
      this.alertText = msg
      this.alert = true
    }
  },

  data: () => ({
    //

    name: null,
    netID: null,
    paidDues: null,
    alert: false,
    alertText: 'No Message',
    submitNot: true
  })
}
</script>
