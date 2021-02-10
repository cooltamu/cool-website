<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col align="center"> <h2>Points</h2></v-col>
      <v-divider vertical></v-divider>
      <v-col align="center"> <h2>Events</h2></v-col>
      <v-divider vertical></v-divider>
      <v-col class="ml-2" align="center">
        <h2>Meetings</h2>
        <v-card outlined max-width="344">
          <v-card-title>{{ currentMeeting.title }}</v-card-title>
          <v-card-subtitle>{{ currentMeeting.dates }}</v-card-subtitle>
          <v-card-text> {{ currentMeeting.description }} </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="teal accent-4"
              v-on:click="
                open(
                  'zoommtg://jonathan.zoom.us/join?action=join&confno=' +
                    currentMeeting.url.match('[0-9]{9,}')[0]
                )
              "
            >
              Quick Launch
            </v-btn>
            <v-btn
              text
              color="white accent-4"
              v-on:click="copy(currentMeeting.url)"
            >
              Copy Link
            </v-btn>
          </v-card-actions>
        </v-card></v-col
      >
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
    }
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
