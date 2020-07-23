<template>
    <div class="stories">
        <div class="responses-list">
            <div class="responses-inner">
                <div v-if="loading" class="loader-icon">
                    <img src="@/assets/images/loader.svg" alt="loading">
                </div>
                <template v-else>
                    <div class="single-response" v-if="windowWidth <= 768" v-for="(response, key) in responses" :key="key">{{response.response}}
                        <span class="response-owner">&mdash; {{response.name | capitalize}}, {{response.city | capitalize}}</span>
                    </div>
                    <dynamic-marquee v-if="windowWidth > 768" :reverse="true" direction="column" :speed="scrollSpeed" :hoverPause="false" :pause="pause">
                        <div class="single-response" v-for="(response, key) in responses" :key="key">{{response.response}}
                            <span class="response-owner">&mdash; {{response.name | capitalize}}, {{response.city | capitalize}}</span>
                        </div>
                    </dynamic-marquee>
                </template>
            </div>
            <div class="responses-toggle" v-if="responses.length > 0">
                <button @click="togglePause">
                    <img src="@/assets/images/play.svg" alt="play" v-if="pause" title="pause" />
                    <img src="@/assets/images/pause.svg" alt="pause" v-if="!pause" title="play" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import DynamicMarquee from "vue-dynamic-marquee";
export default {
  components: {
    DynamicMarquee,
  },
  data() {
    return {
      loading: false,
      error: false,
      pause: false,
      windowWidth: window.innerWidth,
    };
  },
  created() {
    this.$store.dispatch("FetchResponses");
  },
  computed: {
    scrollSpeed() {
      return { type: "duration", number: 60000 };
    },
    responses() {
      return this.$store.getters.responses;
    },
    responsesCount() {
      return this.responses.length.toLocaleString();
    },
  },
  methods: {
    togglePause() {
      this.pause = !this.pause;
    },
  },
};
</script>
