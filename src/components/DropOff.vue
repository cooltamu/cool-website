<template>
  <v-container fluid>
    <v-layout row wrap>
      <h1 class="display-3" v-if="!submitNot">Thank you for your Donation!</h1>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
        v-if="submitNot"
      >
        <v-card-title>
          <span class="headline">Book Drop Off</span>
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
                  name="UIN"
                  rules="numeric|required"
                  v-slot="{ errors, validator }"
                >
                  <v-text-field
                    label="UIN*"
                    v-model="uin"
                    :error-messages="errors"
                    hint="Your UIN can be found on the bottom right of your Texas A&M ID card!"
                    :success="validator"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider
                  name="Book Titles"
                  rules="required"
                  v-slot="{ errors, validator }"
                >
                  <v-combobox
                    v-model="bookTitles"
                    label="Enter or press 'Return' for each book"
                    :error-messages="errors"
                    :success="validator"
                    multiple
                    chips
                    deletable-chips
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                        close
                      >
                        <v-avatar
                          class="accent white--text"
                          left
                          v-text="data.item.slice(0, 1).toUpperCase()"
                        ></v-avatar>
                        {{ data.item }}
                      </v-chip>
                    </template>
                  </v-combobox>
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
      /* eslint consistent-this: [2, "vueApp"]*/
      const vueApp = this
      fetch(
        `https://docs.google.com/forms/d/e/1FAIpQLSeisIW7fkoHHiDlMYItcn-XDt9vjo4anlwm9GscXVR5dAl_ug/formResponse?usp=pp_url&entry.151147820=${
          this.name
        }&entry.1340557686=${this.uin}&entry.180529066=${this.bookTitles.join(
          '|'
        )}`,
        { mode: 'no-cors', method: 'POST' }
      ).then((response) => {
        vueApp.submitNot = false
        vueApp.customAlert(
          `Thank you for your Book Drop Off submission ${vueApp.name}!`
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
    uin: null,
    alert: false,
    bookTitles: null,
    alertText: 'No Message',
    submitNot: true
  })
}
</script>
