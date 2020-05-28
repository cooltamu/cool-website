<template>
  <v-dialog v-model="open" max-width="500px" content-class="dlgNewEditItem">
    <v-card>
      <v-card-title>
        <span class="headline">{{ this.data }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="item.name"
              :counter="10"
              :rules="rules.name"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="item.schedule"
              :rules="rules.schedule"
              label="Schedule"
              required
            ></v-text-field>

            <!-- <v-select
              v-model="select"
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="Item"
              required
            ></v-select>

            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox> -->

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
              Reset Form
            </v-btn>

            <v-btn color="warning" @click="resetValidation">
              Reset Validation
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn color="red lighten3" text @click="close" class="btnCancel">{{
          $t('dataTable.CANCEL')
        }}</v-btn>
        <v-btn
          color="green lighten3"
          text
          @click="save"
          class="btnSave"
          :disabled="invalid"
          >{{ $t('dataTable.SAVE') }}</v-btn
        > -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  name: 'ClassEditForm',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('events.TITLE')} - %s`
    }
  },
  props: ['data', 'mode', 'open'],
  data() {
    return {
      valid: true,
      dialog: true,
      item: { name: '', schedule: '' },
      rules: {
        name: [(v) => !!v || 'Name is required'],
        schedule: [(v) => !!v || 'Schedule is required'],
        location: [(v) => !!v || 'Location is required']
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions(['getAllClasses']),
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  async mounted() {
    await this.getAllClasses()
  }
}
</script>

<style>
.card-info-item {
  padding: 0px 16px 8px 16px;
}
.card-spacer {
  padding: 8px 16px 8px 16px;
}
</style>
