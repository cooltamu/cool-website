<template>
  <div class>
    <v-tabs centered v-model="tab">
      <v-tab key="1">
        Overview
      </v-tab>
      <v-tab key="2">
        Students
      </v-tab>
      <v-tab>
        Members
      </v-tab>
    </v-tabs>
    <v-container>
      <v-tabs-items
        v-model="tab"
        style="
          background-color: transparent;
          text-align: left;
          margin-bottom: 10px;
        "
      >
        <v-tab-item key="1">
          <v-row class="mt-2">
            <v-col cols="12" sm="12">
              <v-card>
                <v-card-title class="headline font-weight-bold">{{
                  classData.name
                }}</v-card-title>
                <v-card-text>
                  <p class="mt-n1 font-weight-regular"></p>

                  <p class="mt-n1 font-weight-medium">
                    {{ classData.schedule }} <br />
                    {{ classData.location }} <br />
                    {{ classData.info }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-card>
                <div style="height: 100px;" />
                <v-card-text>
                  <p class="title">Some cool Data Viz #1</p>
                </v-card-text>
                <div style="height: 100px;" />
                <v-card-actions>
                  <v-btn text disabled>Button</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-card>
                <div style="height: 100px;" />
                <v-card-text>
                  <p class="title">Some cool Data Viz #2</p>
                </v-card-text>
                <div style="height: 100px;" />
                <v-card-actions>
                  <v-btn text disabled>Button</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item key="2">
          <v-row class="mt-4"
            ><v-col
              v-for="mentee in classData.mentees"
              v-bind:key="mentee._id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card max-width="400" class="mx-auto">
                <v-list-item>
                  <!-- <v-list-item-avatar color="grey">{{
                    getInitials(mentee.name)
                  }}</v-list-item-avatar> -->
                  <v-list-item-content>
                    <v-list-item-title class="headline">{{
                      mentee.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ `${getMentorByMenteeId(mentee._id)}` }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-card-text>
                  <v-sparkline
                    :value="getSparklineData()"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                  />
                </v-card-text>

                <!-- <v-card-actions>
                  <v-btn text color="deep-purple accent-4">
                    Read
                  </v-btn>
                  <v-btn text color="deep-purple accent-4">
                    Bookmark
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </v-card-actions> -->
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item key="3"> <MemberManager /></v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'
import MemberManager from './ClassMemberManager.vue'

export default {
  components: {
    MemberManager
  },
  name: 'ClassOverview',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('events.TITLE')} - %s`
    }
  },
  props: ['data', 'mode'],
  data() {
    return {
      tab: null,
      items: [
        {
          icon: true,
          title: 'Jason Oner',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
        },
        {
          title: 'Travis Howard',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
        },
        {
          title: 'Ali Connors',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
        },
        {
          title: 'Cindy Baker',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getActiveClass']),
    classData() {
      return this.getActiveClass()
    },
    id() {
      return this.$route.params.classId
    }
  },
  watch: {},
  methods: {
    ...mapActions(['getClass']),
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
    },
    getInitials(name) {
      const nameSegments = name.split(' ')
      const initals = nameSegments.map((segment) => segment.substring(0, 1))
      return initals.join('')
    },
    getSparklineData() {
      return _.times(6, _.random.bind(0, 80))
    },
    getMentorByMenteeId(id) {
      const mentorship = this.classData.mentorships.find(
        (el) => el.mentee._id === id
      )
      return mentorship ? `Mentored by ${mentorship.mentor.name}` : 'Unmentored'
    }
  },
  async mounted() {
    await this.getClass({ _id: this.id })
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
