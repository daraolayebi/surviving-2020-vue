<template>
    <div id="responses" class="responses">
        <div class="responses-bg">
            <div class="responses-toggle">
                <button @click="togglePause">
                    <img src="@/assets/play.svg" alt="play" v-if="pause" title="pause" />
                    <img src="@/assets/pause.svg" alt="pause" v-if="!pause" title="play" />
                </button>
            </div>
            <div class="responses-list">
                <div class="responses-inner">
                    <dynamic-marquee :reverse="true" :speed="scrollSpeed" :hoverPause="false" :pause="pause">
                        <template v-for="(response, key) in responses">
                            <div class="single-response" :key="key">{{response.response}} &mdash;
                                <span>{{response.name | capitalize}}, {{response.city |capitalize}}</span>
                            </div>
                        </template>
                    </dynamic-marquee>
                </div>
            </div>
        </div>
        <app-footer />
    </div>
</template>

<script>
import AppFooter from "../components/Footer";
import DynamicMarquee from "vue-dynamic-marquee";
import axios from "axios";
export default {
  components: {
    AppFooter,
    DynamicMarquee,
  },
  data() {
    return {
      responses: [],
      loading: false,
      error: false,
      pause: false,
    };
  },
  beforeMount() {
    this.loadResponses();
  },
  computed: {
    scrollSpeed() {
      return {
        type: "duration",
        number: 50000,
      };
    },
  },
  methods: {
    togglePause() {
      this.pause = !this.pause;
    },
    loadResponses() {
      this.error = false;
      this.loading = true;
      axios
        .get("http://localhost:3200/api/responses")
        .then(res => {
          this.loading = false;
          this.responses = res.data.data.reverse();
          console.log(res);
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
          console.log(err);
        });
    },
  },
};
</script>
