<template>
  <div>
    <v-row class="mt-2">
      <v-col cols="12" sm="4">
        <v-card class="px-4 py-4">
          <v-select
            :items="['Teachers', 'Students', 'Mentorships']"
            v-model="memberType"
            outlined
            dense
            hide-details
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row v-show="memberType == 'Teachers'">
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
    <v-row v-show="memberType == 'Students'">
      <v-col cols="12" sm="12" md="6">
        <MemberList
          key="1"
          title="Current Students"
          :actions="['delete', 'select']"
          :data="classData.mentees"
          v-on:remove-item="handleMenteeRemoved"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <MemberList
          key="2"
          title="All Students"
          :actions="['create', 'search', 'select']"
          :data="allMentees()"
          :count="allMenteesCount()"
          v-on:add-item="handleMenteeAdded"
          v-on:search="handleMenteeSearched"
        />
      </v-col>
    </v-row>
    <v-row v-show="memberType == 'Mentorships'">
      <v-col cols="12" sm="12" md="8">
        <MemberList
          key="1"
          title="Current Mentorships"
          :actions="['delete', 'select']"
          :data="classData.mentorships"
          v-on:remove-item="handleMentorshipRemoved"
        />
      </v-col>
    </v-row>
    <v-row v-show="memberType == 'Mentorships'">
      <v-col cols="12" sm="12" md="6">
        <MemberList
          key="1"
          title="Unmatched Students"
          :actions="['select']"
          :data="
            classData.mentees.filter(
              (mentee) =>
                !classData.mentorships.some(
                  (mentorship) => mentorship.mentee._id == mentee._id
                )
            )
          "
          v-on:select="(val) => (mentorshipMentee = val ? val._id : '')"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <MemberList
          key="2"
          title="All Mentors"
          :actions="['create', 'search', 'select']"
          :actionsEnabled="mentorshipMentee.length > 1"
          :data="allMentors()"
          :count="allMentorsCount()"
          v-on:add-item="handleMentorshipAdded"
          v-on:search="handleMentorSearched"
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
    return { memberType: 'Teachers', mentorshipMentee: '' }
  },
  computed: {
    ...mapGetters([
      'getActiveClass',
      'allTeachersCount',
      'allTeachers',
      'allMentees',
      'allMenteesCount',
      'allMentors',
      'allMentorsCount'
    ]),
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
      'getAllTeachers',
      'getAllMentees',
      'getAllMentors',
      'addMentee',
      'removeMentee',
      'addMentorship',
      'removeMentorship'
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
    },
    async handleMenteeSearched(payload) {
      await this.getAllMentees(payload)
    },
    async handleMentorSearched(payload) {
      await this.getAllMentors(payload)
    },
    async handleMenteeAdded(payload) {
      await this.addMentee({
        userId: payload._id,
        classId: this.classId
      })
    },
    async handleMenteeRemoved(payload) {
      await this.removeMentee({
        userId: payload._id,
        classId: this.classId
      })
    },
    async handleMentorshipAdded(payload) {
      await this.addMentorship({
        mentor: payload._id,
        mentee: this.mentorshipMentee,
        classId: this.classId
      })
    },
    async handleMentorshipRemoved(payload) {
      await this.removeMentorship({
        mentorshipId: payload._id,
        classId: this.classId
      })
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
