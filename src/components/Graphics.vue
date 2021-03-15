<template>
  <v-container>
    <v-layout row wrap>
      <v-row>
        <v-col cols="4">
          <v-card>
            <v-img src="/graphics/Owl Circle.png">
              <v-card-title></v-card-title>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="primary"
                @click="downloadImg('/graphics/Owl Circle.png')"
              >
                <v-icon>mdi-download</v-icon> Download
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-img src="/graphics/Owl.png">
              <v-card-title></v-card-title>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary" @click="downloadImg('/graphics/Owl.png')">
                <v-icon>mdi-download</v-icon> Download
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-img src="/graphics/Owl Circle_without_2020.png">
              <v-card-title></v-card-title>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="primary"
                @click="downloadImg('/graphics/Owl Circle_without_2020.png')"
              >
                <v-icon>mdi-download</v-icon> Download
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="text-center" align-center justify="center" align="center">
        <h1>
          Font: Bebas Neue | Red: #f32d49 - Green: #20A29A - Orange: #fe5750
        </h1>
      </v-row>

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
    customAlert(msg) {
      this.alertText = msg
      this.alert = true
    },
    downloadImg(img) {
      const a = document.createElement('a')
      a.href = img
      a.download = img
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      this.customAlert('Downloading!')
    }
  },

  data: () => ({ alertText: null, alert: false })
}
</script>
