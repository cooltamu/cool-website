<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col class="mr-2" align="center">
        <h2>Forms & Info</h2>
        <v-btn to="points" x-large class="my-2">Look Up Points</v-btn>
        <v-divider></v-divider>
        <v-btn
          x-large
          class="my-2"
          v-on:click="open('https://groupme.com/join_group/61918655/xSB9Wj8Z')"
          >Join Our GroupMe</v-btn
        >
        <v-divider></v-divider>
        <v-btn
          x-large
          class="my-2"
          v-on:click="open('https://forms.gle/aSMZJAtVBphAJaZQ9')"
          >Profit Share Submission</v-btn
        >
        <v-divider></v-divider>
        <v-btn
          x-large
          class="my-2"
          v-on:click="open('https://forms.gle/dXfA9iNQ3XZPHEk69')"
          >Volunteering Events Submission</v-btn
        >
      </v-col>

      <v-divider vertical></v-divider>
      <v-col class="mx-2" align="center">
        <h2>Events</h2>
        <h4>More info can be found in archived meetings.</h4>
        <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="(item, i) in eventsTimeline"
            :key="i"
            :color="item.color"
            :icon="item.icon"
            fill-dot
          >
            <v-card :color="item.color" dark>
              <v-card-title class="title">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle class="text-left">{{
                item.time
              }}</v-card-subtitle>
              <v-card-text>
                <p>
                  {{ item.info }}
                </p>

                <strong>
                  {{ item.points }}
                </strong>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="ml-2" align="center">
        <h2>Meetings</h2>
        <v-card outlined class="mb-2 text-left">
          <v-card-title>{{ currentMeeting.title }}</v-card-title>
          <v-card-subtitle>{{ currentMeeting.dates }}</v-card-subtitle>
          <v-card-text> {{ currentMeeting.description }} </v-card-text>
          <v-card-actions> </v-card-actions>
        </v-card>
        <v-divider></v-divider>
        <v-btn class="mt-2" x-large to="meetings">
          View Archived Meetings
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="showVerifyDialog" width="500" persistent>
      <v-card>
        <v-card-title
          class="headline grey lighten-2 black--text dlgVerifyAccount"
          primary-title
        >
          <v-icon class="orange--text">mdi-information</v-icon>
          &nbsp;{{ $t('home.VERIFY_YOUR_ACCOUNT') }}
        </v-card-title>
        <v-card-text class="mt-4">
          {{ $t('home.VERIFY_YOUR_ACCOUNT_DESCRIPTION') }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="showVerifyDialog = false"
            class="btnClose"
            >{{ $t('home.CLOSE') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog></v-container
  >
</template>

<script>
export default {
  name: 'Members',
  data() {
    return {
      currentMeeting: {
        title: 'General Meeting / Informational',
        description:
          'Informational General Meeting. Sept 21 @ MSC 2503 | Sept 22 @ Rudder Tower 308',
        dates: 'Sept 21 & 22 @ 7PM - 8PM'
      },
      eventsTimeline: [
        {
          color: 'secondary',
          icon: 'mdi-tea',
          title: 'Profit Share',
          info: 'Kung Fu Tea | 723 Texas Ave S',
          time: 'Sept 30th - 11:30am-10pm',
          points: '1 Point + 1 point for a friend'
        },
        {
          color: 'primary',
          icon: 'mdi-cash-multiple',
          title: 'Membership Dues Deadline',
          info: 'Deadline to pay membership dues. Link coming soon.',
          time: 'Nov 10th - 11:59 PM',
          points: '$15 without shirt, $25 with shirt'
        }
      ]
      // name: this.$store.state.auth.user.name,
      // showVerifyDialog: !this.$store.state.verify.emailVerified
    }
  },
  methods: {
    async copy(s) {
      await navigator.clipboard.writeText(s)
      // alert('Copied!');
    },
    open(s) {
      window.open(s)
      // alert('Copied!');
    }
  }
}
</script>
