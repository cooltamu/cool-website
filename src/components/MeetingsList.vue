<template>
  <v-container fluid class="container">
    <h1>COOL Meetings</h1>
    <h2>Upcoming</h2>
    <v-card outlined max-width="344">
      <v-card-title>{{ currentMeeting.title }}</v-card-title>
      <v-card-subtitle>{{ currentMeeting.dates }}</v-card-subtitle>
      <v-card-text> {{ currentMeeting.description }} </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" v-on:click="open(currentMeeting.url)">
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
    <h2>Archive</h2>
    <div class="d-flex flex-wrap">
      <v-card
        outlined
        max-width="370px"
        v-for="item in meetings"
        :key="item.title"
        class="archive-card"
      >
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-subtitle>{{ item.dates }}</v-card-subtitle>
        <!-- <v-card-text> -->
        <!-- <a :href="item.presentation"> Slide Deck </a> -->
        <iframe
          height="315"
          width="370px"
          :src="item.recording"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div class="action-container">
          <v-btn
            text
            color="teal accent-4"
            v-on:click="open(item.presentation)"
          >
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
    </div>
  </v-container>
</template>
<style>
.container {
  text-align: left;
  margin: 2% 10%;
}
.archive-card {
  margin-right: 40px;
  margin-bottom: 40px;
  width: 100%;
}
.action-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: baseline;
  margin-bottom: 8px;
  padding-left: 10px;
}

h1,
h2 {
  margin: 20px 5px;
}
</style>
<script>
export default {
  name: 'App',

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
      title: 'General Meeting #4',
      url: 'https://tamu.zoom.us/j/9031082370#success',
      description: 'Fourth monthly general body meeting',
      dates: 'Nov 18 & 19 @ 7PM'
    },
    meetings: [
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
