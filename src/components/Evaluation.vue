<template>
  <v-container fluid>
    <v-layout row wrap>
      <h1 class="display-3" v-if="!submitNot">
        Thank you for your Submission!
      </h1>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
        v-if="submitNot"
      >
        <v-card-title>
          <span class="headline">COOL Member Evaluation Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col col="12">
                <p>
                  The information I needed to know was presented to me in a
                  clear manner. *
                </p>
                <ValidationProvider
                  name="Presented"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-slider
                    v-model="presented"
                    :error-messages="errors"
                    :success="validator"
                    :color="colorGB[presented - 1]"
                    :max="10"
                    :min="1"
                    step="1"
                    :label="satisfactionEmojis[presented - 1]"
                    inverse-label
                  >
                    <template v-slot:thumb-label="{ value }">
                      {{ satisfactionEmojis[value - 1] }}
                    </template></v-slider
                  >
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12">
                <p>
                  COOL was manageable with my school schedule. *
                </p>
                <ValidationProvider
                  name="Manageable"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-slider
                    v-model="manageable"
                    :error-messages="errors"
                    :success="validator"
                    :color="colorGB[manageable - 1]"
                    :max="10"
                    :min="1"
                    step="1"
                    :label="satisfactionEmojis[manageable - 1]"
                    inverse-label
                  >
                    <template v-slot:thumb-label="{ value }">
                      {{ satisfactionEmojis[value - 1] }}
                    </template></v-slider
                  >
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12">
                <p>
                  I believe COOL did a good job adapting to COVID in regards to
                  the volunteering opportunities. *
                </p>
                <ValidationProvider
                  name="Adapting"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-slider
                    v-model="adapting"
                    :error-messages="errors"
                    :success="validator"
                    :color="colorGB[adapting - 1]"
                    :max="10"
                    :min="1"
                    step="1"
                    :label="satisfactionEmojis[adapting - 1]"
                    inverse-label
                  >
                    <template v-slot:thumb-label="{ value }">
                      {{ satisfactionEmojis[value - 1] }}
                    </template></v-slider
                  >
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12">
                <p>
                  I believe the implemented point system is achievable and
                  doable for me to reach. *
                </p>
                <ValidationProvider
                  name="Achievable"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-slider
                    v-model="achievable"
                    :error-messages="errors"
                    :success="validator"
                    :color="colorGB[achievable - 1]"
                    :max="10"
                    :min="1"
                    step="1"
                    :label="satisfactionEmojis[achievable - 1]"
                    inverse-label
                  >
                    <template v-slot:thumb-label="{ value }">
                      {{ satisfactionEmojis[value - 1] }}
                    </template></v-slider
                  >
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  name="Enjoy"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="What did you enjoy about COOL during this semester? *"
                    v-model="enjoy"
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
                  name="Differently"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="What do you want to see differently in the coming semesters? *"
                    v-model="differently"
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
                  name="Anything"
                  rules=""
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="Is there anything else you want to say?"
                    v-model="anything"
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
        `https://docs.google.com/forms/d/e/1FAIpQLSc0o95wU6Vh4cUHqj-B4k2__-P5RAE13srz6OUVPNurzlwlAA/formResponse?usp=pp_url&entry.857897942=${this.presented}&entry.176655058=${this.manageable}&entry.620577815=${this.adapting}&entry.1086229694=${this.achievable}&entry.1420821961=${this.enjoy}&entry.1982343291=${this.differently}&entry.883298272=${this.anything}`,
        { mode: 'no-cors', method: 'POST' }
      ).then((response) => {
        vueApp.submitNot = false
        vueApp.customAlert(`Thank you for your submission!`)
      })
    },
    customAlert(msg) {
      this.alertText = msg
      this.alert = true
    }
  },

  data: () => ({
    //
    presented: 5,
    manageable: 5,
    adapting: 5,
    achievable: 5,
    enjoy: null,
    differently: null,
    anything: null,
    alert: false,
    alertText: 'No Message',
    submitNot: true,
    colorGB: [
      '#F32D49',
      '#DC3A52',
      '#C4475B',
      '#AD5464',
      '#95616D',
      '#7E6E76',
      '#667B7F',
      '#4F8888',
      '#379591',
      '#20A29A'
    ],
    satisfactionEmojis: [
      '😭',
      '😢',
      '☹️',
      '🙁',
      '😐',
      '🙂',
      '😊',
      '😁',
      '😄',
      '😍'
    ]
  })
}
</script>
