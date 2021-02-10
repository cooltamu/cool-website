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
          v-on:click="open('https://forms.gle/aqKxRp3B3JzW2JPR8')"
          >Profit Share Submission</v-btn
        >
        <v-divider></v-divider>
        <v-btn x-large class="my-2">Volunteering Events Submission</v-btn>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="mx-2" align="center">
        <h2>Events</h2>
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
    </v-row></v-container
  >
</template>

<script>
export default {
  name: 'Members',
  data: () => ({
    currentMeeting: {
      title: 'General Meeting #4',
      url: 'https://tamu.zoom.us/j/91510750886',
      description: 'Fourth monthly general body meeting',
      dates: 'Feb 10 & 11 @ 7PM'
    },
    eventsTimeline: [
      {
        color: 'primary',
        icon: 'mdi-book-variant',
        title: 'Creating Online Stories',
        info: 'Info about the event',
        time: 'Feb 10th - Mar 5th',
        points: '3 points'
      },
      {
        color: 'secondary',
        icon: 'mdi-book-variant',
        title: 'Event 2',
        info: 'Info about the event',
        time: 'now til tmrw',
        points: '3 for every 2'
      },
      {
        color: 'accent',
        icon: 'mdi-airballoon',
        title: 'Event 3',
        info: 'Info about the event',
        time: 'now til tmrw',
        points: '3 for every 2'
      }
    ]
  }),
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
