<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col class="mr-2" align="center">
        <h2>Points</h2>
        <v-btn to="points" x-large class="my-2">Look Up Points</v-btn>
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
          <v-card-actions>
            <v-btn
              text
              color="teal accent-4"
              v-on:click="open(currentMeeting.url)"
            >
              Launch
            </v-btn>
            <v-btn
              text
              color="white accent-4"
              v-on:click="copy(currentMeeting.url)"
            >
              Copy Link
            </v-btn>
          </v-card-actions>
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
        title: 'General Meeting #4',
        url: 'https://tamu.zoom.us/j/91510750886',
        description: 'Fourth monthly general body meeting',
        dates: 'Feb 10 & 11 @ 7PM'
      },
      eventsTimeline: [
        {
          color: 'secondary',
          icon: 'mdi-pizza',
          title: 'Profit Share',
          info: 'Blaze Pizza | 143 Century Square Drive',
          time: 'Feb 12th - 11AM-9PM',
          points: '1 Point + 1 point for a friend'
        },
        {
          color: 'primary',
          icon: 'mdi-account-heart',
          title: 'Valentine’s Day Cards',
          info: 'Valentine’s Day Zoom Social',
          time: 'Feb 14 - 11AM-12PM',
          points: '1 Point for 2 cards | Max 1 point'
        },
        {
          color: 'accent',
          icon: 'mdi-tshirt-crew',
          title: 'Design T-shirts',
          info: 'Come up with a shirt design',
          time: 'Deadline Feb 20th',
          points: '2 Points'
        },
        {
          color: 'primary',
          icon: 'mdi-book-variant',
          title: 'Creating Online Stories',
          info:
            'Create a children’s picture book to explain the ongoing pandemic',
          time: 'Feb 10th - Mar 5th',
          points: '3 Points'
        },
        {
          color: 'secondary',
          icon: 'mdi-bookmark',
          title: 'Bookmarks',
          info: 'Design a Bookmark to be placed in our community library! ',
          time: 'Feb 10th - Mar 10th',
          points: '1 Point per Bookmark | Max 2 Points'
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
