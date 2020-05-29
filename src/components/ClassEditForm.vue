<template>
  <v-dialog
    persistent
    v-model="dialog"
    max-width="500px"
    content-class="dlgNewEditItem"
  >
    <v-card>
      <v-card-title>
        <span class="headline"
          >{{ mode == 'edit' ? 'Edit' : 'Create' }} Class</span
        >
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <template v-if="mode == edit">
              <v-flex xs12 md6>
                <label for="createdAt">{{ $t('common.CREATED') }}</label>
                <div name="createdAt">
                  {{ getFormat(data.createdAt) }}
                </div>
              </v-flex>
              <v-flex xs12 md6>
                <label for="updatedAt">{{ $t('common.UPDATED') }}</label>
                <div name="updatedAt">
                  {{ getFormat(data.updatedAt) }}
                </div>
              </v-flex>
            </template>
            <v-form ref="form" v-model="valid" lazy-validation id="edit-form">
              <v-flex xs12>
                <v-text-field
                  v-model="formData.name"
                  :counter="10"
                  :rules="rules.name"
                  label="Name"
                  required
                />
              </v-flex>
              <v-text-field
                v-model="formData.schedule"
                :rules="rules.schedule"
                label="Schedule"
                required
              />
              <v-text-field
                v-model="formData.location"
                :rules="rules.location"
                label="Location"
                required
              />
              <v-text-field
                v-model="formData.info"
                :rules="rules.info"
                label="Info"
                required
              />
            </v-form>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="close" class="btnCancel">{{
          $t('dataTable.CANCEL')
        }}</v-btn>
        <v-btn
          color="green"
          text
          @click="save"
          class="btnSave"
          :disabled="!valid"
          >{{ $t('dataTable.SAVE') }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  name: 'ClassEditForm',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('events.TITLE')} - %s`
    }
  },
  props: ['data', 'mode'],
  data() {
    return {
      formData: _.cloneDeep(
        _.pick(this.data, ['name', 'schedule', 'location', 'info', '_id'])
      ),
      valid: true,
      dialog: true,
      item: { name: '', schedule: '' },
      rules: {
        name: [(v) => !!v || 'Name is required'],
        schedule: [(v) => !!v || 'Schedule is required'],
        location: [(v) => !!v || 'Location is required'],
        info: []
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions(['editClass', 'createClass']),
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    close() {
      this.$emit('close')
    },
    async save() {
      if (this.valid) {
        if (this.mode === 'create') {
          await this.createClass(this.formData)
        } else if (this.mode === 'edit') {
          await this.editClass(this.formData)
        }
        this.$emit('close')
      }
    },
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    }
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
#edit-form {
  width: 100%;
}
</style>
