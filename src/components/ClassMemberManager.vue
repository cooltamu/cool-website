<template>
  <div>
    <v-row class="mt-2">
      <v-col cols="12" sm="4">
        <v-card class="px-4 py-4">
          <v-select
            :items="['Teachers', 'Students', 'Mentorships']"
            outlined
            dense
            hide-details
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <MemberList
          key="1"
          title="Current Teachers"
          :actions="['delete', 'select']"
          :data="classData.teachers"
          v-on:remove-item="handleTeacherRemoved"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <MemberList
          key="2"
          title="All Teachers"
          :actions="['create', 'search', 'select']"
          :data="allTeachers()"
          :count="allTeachersCount()"
          v-on:add-item="handleTeacherAdded"
          v-on:search="handleTeacherSearched"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'
import MemberList from './ClassMemberList'
export default {
  components: {
    MemberList
  },
  name: 'ClassMemberManager',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('events.TITLE')} - %s`
    }
  },
  props: ['data', 'mode'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getActiveClass', 'allTeachersCount', 'allTeachers']),
    classData() {
      return this.getActiveClass()
    },
    classId() {
      return this.$route.params.classId
    }
  },
  watch: {},
  methods: {
    ...mapActions([
      'getClass',
      'addTeacher',
      'removeTeacher',
      'getAllTeachers'
    ]),
    async handleTeacherAdded(payload) {
      await this.addTeacher({
        userId: payload._id,
        classId: this.classId
      })
    },
    async handleTeacherRemoved(payload) {
      await this.removeTeacher({
        userId: payload._id,
        classId: this.classId
      })
    },
    async handleTeacherSearched(payload) {
      await this.getAllTeachers(payload)
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
