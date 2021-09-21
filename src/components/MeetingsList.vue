<template>
  <v-container class="text-left">
    <h1>COOL Meetings</h1>
    <h2>Upcoming</h2>
    <v-card outlined max-width="344">
      <v-card-title>{{ currentMeeting.title }}</v-card-title>
      <v-card-subtitle>{{ currentMeeting.dates }}</v-card-subtitle>
      <v-card-text> {{ currentMeeting.description }} </v-card-text>
      <v-card-actions>
      </v-card-actions>
    </v-card>
    <h2>Archive</h2>
    <v-row>
      <v-col v-for="item in meetings" :key="item.title" class="archive-card">
        <v-card outlined>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.dates }}</v-card-subtitle>
          <!-- <v-card-text> -->
          <!-- <a :href="item.presentation"> Slide Deck </a> -->
          <iframe
            width="350px"
            :src="item.recording"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div class="action-container">
            <v-btn text color="primar" v-on:click="open(item.presentation)">
              Slide Deck
            </v-btn>
            <!-- <v-btn
            text
            color="teal accent-4"
            v-on:click="open(item.presentation)"
          >
            Minutes
          </v-btn> -->
          </div>

          <!-- </v-card-text> -->
          <!-- <v-card-actions>
          <v-btn text color="teal accent-4" @click="reveal = true">
            Slide Deck
          </v-btn>
          <v-btn text color="white accent-4" @click="reveal = true">
            Copy Link
          </v-btn>
        </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
<script>
export default {
  name: 'MeetingsList',

  components: {},
  created() {
    this.canCopy = !!navigator.clipboard
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
  },
  data: () => ({
    currentMeeting: {
        title: 'General Meeting / Informational',
        description:
          'Informational General Meeting. Sept 21 @ MSC 2503 | Sept 22 @ Rudder Tower 308',
        dates: 'Sept 21 & 22 @ 7PM - 8PM'
    },
    meetings: [
      {
        title: 'General Meeting #4',
        presentation:
          'https://docs.google.com/presentation/d/e/2PACX-1vTMmz7rQwtSOTqqItWk5MgY2ivS4AR9b_4bmxHG4hB6vW-Wta83eYqp1SqODNtXch0ooCkP7Sn0K_h4/pub?start=false&loop=false&delayms=3000&slide=id.p',
        minutes: '',
        dates: 'Feb 10 & 11 @ 7PM',
        recording: 'https://www.youtube.com/embed/f_k0HjTMqHM'
      },
      {
        title: 'General Meeting #3',
        presentation:
          'https://www.canva.com/design/DAENvFZX8k8/_GVqzM9oy8pzTWs22mCGGQ/view?utm_content=DAENvFZX8k8&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton',
        minutes: '',
        dates: 'Nov 18 & 19 @ 7PM',
        recording: 'https://www.youtube.com/embed/e8cm6G4nWvg'
      },
      {
        title: 'General Meeting #2',
        presentation:
          'https://www.canva.com/design/DAELBEh0vMQ/f74Bw9CD3_G0TPahFb4gTg/view?utm_content=DAELBEh0vMQ&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton',
        minutes: '',
        dates: 'Oct 21 & 22 @ 7PM',
        recording: 'https://www.youtube.com/embed/3gX0NefFbXo'
      },
      {
        title: 'General Meeting #1',
        presentation:
          'https://drive.google.com/file/d/1BNDemGcHxEk57EYpoorOgnD5ylgBkRGs/view?usp=sharing',
        minutes: '',
        dates: 'Sept 23 & 24 @ 7PM',
        recording: 'https://www.youtube.com/embed/GjrnCJ5Aj5M'
      }
    ]
  })
}
</script>
