<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-container v-if="!submitNot">
        <v-row>
          <h1 class="display-3">
            Thank you for your Submission!
          </h1>
        </v-row>
        <v-row>
          <v-btn @click="navigateToGame">
            Click to Go to Game!
          </v-btn>
        </v-row>
      </v-container>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
        v-if="submitNot"
      >
        <v-card-title>
          <span class="headline">COOL Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  name="First Name"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="First Name? *"
                    v-model="fName"
                    :error-messages="errors"
                    :success="validator"
                    persistent-hint
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  name="Last Name"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="Last Name? *"
                    v-model="lName"
                    :error-messages="errors"
                    :success="validator"
                    persistent-hint
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  name="Phone Number"
                  rules=""
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="Phone Number? *"
                    v-model="phoneNum"
                    type="tel"
                    :error-messages="errors"
                    :success="validator"
                    persistent-hint
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  name="E-mail"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="Email(Prefer Tamu) *"
                    v-model="email"
                    :error-messages="errors"
                    :success="validator"
                    persistent-hint
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
          <v-btn color="error" text v-bind="attrs" @click="alert = false">
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
      /* eslint consistent-this: [2, "vueApp"]*/
      const vueApp = this
      fetch(
        `https://docs.google.com/forms/d/e/1FAIpQLScf9APY1vZ8n1k3WyuKUS9J3jD58w6gPxT65Yt1QiAlTUeFiQ/formResponse?usp=pp_url&entry.300875221=${this.fName}&entry.1314476679=${this.lName}&entry.655300869=${this.phoneNum}&entry.544819802=${this.email}`,
        { mode: 'no-cors', method: 'POST' }
      ).then((response) => {
        vueApp.submitNot = false
        vueApp.customAlert(`Thank you for your submission!`)
      })
    },
    navigateToGame() {
      window.location.href = `https://game.cooltamu.com/client.html?fName=${this.fName}&lName=${this.lName}&email=${this.email}`
    },
    customAlert(msg) {
      this.alertText = msg
      this.alert = true
    }
  },

  data: () => ({
    //
    fName: null,
    lName: null,
    phoneNum: null,
    email: null,
    alert: false,
    alertText: 'No Message',
    submitNot: true
  })
}
</script>
