<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-card
        :loading="loading"
        class="mx-auto my-12"
        min-width="150"
        v-if="!submitNot"
      >
        <template slot="progress">
          <v-progress-linear
            color="primary"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-card-title
          >{{ pointsTitle }}
          <v-spacer></v-spacer>
          <v-btn color="secondary" small @click="wrongPerson()">
            Wrong Person?
          </v-btn></v-card-title
        >

        <v-card-text>
          <v-row align="center" class="mx-0">
            Total Points {{ totalPoints }}
          </v-row>

          <div>
            Please contact Madeline Grice if you believe there is a mistake.
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title
          >Point Breakdown <v-spacer></v-spacer>
          <v-switch
            color="secondary"
            small
            v-model="allPoints"
            label="Show all possible points"
          >
          </v-switch>
        </v-card-title>

        <v-card-text
          ><v-data-iterator
            :items="breakdown"
            :search="search"
            hide-default-footer
          >
            <template v-slot:header>
              <v-toolbar dark color="primary" class="mb-1">
                <v-text-field
                  v-model="search"
                  clearable
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                ></v-text-field>
              </v-toolbar>
            </template>

            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.name" cols="12">
                  <v-card>
                    <v-card-title class="subheading font-weight-bold">
                      {{ item.name }} <v-spacer></v-spacer>
                      {{ item.point }} points
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card-text>
      </v-card>

      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
        v-if="submitNot"
      >
        <v-card-title>
          <span class="headline">View Points</span>
        </v-card-title>
        <v-card-subtitle>
          If you are unable to view your points, please Contact Cool Technical
          Team: Madeline Grice, Arvind Balaji, Jonathan Samuel.
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
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
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" text @click="findPoints()" :disabled="invalid"
            >Find Points</v-btn
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
  computed: {
    breakdown() {
      if (!this.allPoints) {
        return this.pointBreakdownAll
      }
      return this.pointBreakdown
    }
  },
  methods: {
    findPoints() {
      /* eslint consistent-this: [2, "vueApp"]*/
      const vueApp = this
      vueApp.submitNot = false
      vueApp.loading = true
      fetch(
        `https://script.google.com/macros/s/AKfycbzNoAEYrl_2TU4U8rePB0p-fF4WMpe3wG-ZySjwUaGQp-oUb2Y/exec?uin=${this.uin}`,
        { method: 'GET' }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (!data.found) {
            vueApp.customAlert(
              'Sorry, we were unable to find a matching UIN. Please contact Technical Team.'
            )
            vueApp.submitNot = true
          } else {
            vueApp.loading = false
            vueApp.customAlert(
              `Points loaded for ${data.data['First Name']} ${data.data['Last Name']}`
            )
            vueApp.pointsTitle = `Points for ${data.data['First Name']} ${data.data['Last Name']}`
            const dataEntries = Object.entries(data.data)
            dataEntries.forEach((item) => {
              if (
                item[0] !== 'First Name' &&
                item[0] !== 'Last Name' &&
                item[0] !== 'UIN' &&
                item[0] !== 'TAMU Email' &&
                item[0] !== 'Paid?' &&
                item[0] !== 'Total Points'
                // && item[1] !== "" //comment this out if you wanna hide the 0 points
              ) {
                vueApp.pointBreakdown.push({
                  name: item[0],
                  point: item[1] !== '' ? item[1] : 0
                })
                if (item[1] !== '') {
                  vueApp.pointBreakdownAll.push({
                    name: item[0],
                    point: item[1]
                  })
                  vueApp.totalPoints += item[1]
                }
              }
            })
            console.log(vueApp.pointBreakdown)
          }
        })
    },
    wrongPerson() {
      this.submitNot = true
      this.totalPoints = 0
      this.pointBreakdown = []
      this.pointBreakdownAll = []
      this.allPoints = false
      this.pointsTitle = 'Loading Points'
    },
    customAlert(msg) {
      this.alertText = msg
      this.alert = true
    }
  },

  data: () => ({
    //

    uin: null,
    netID: null,
    pointsTitle: 'Loading Points',
    alert: false,
    alertText: 'No Message',
    submitNot: true,
    loading: true,
    totalPoints: 0,
    pointBreakdown: [],
    pointBreakdownAll: [],
    allPoints: false,
    search: null
  })
}
</script>
