<template>
    <div id="responses" class="responses">
        <app-header />
        <div class="responses-bg">
            <div class="responses-topbar">
                <div class="responses-count"></div>
                <div class="responses-toggle">
                    <button :disabled="loading" @click="togglePause">
                        <img src="@/assets/images/play.svg" alt="play" v-if="pause" title="pause" />
                        <img src="@/assets/images/pause.svg" alt="pause" v-if="!pause" title="play" />
                    </button>
                </div>
                <div class="speed-toggle">

                </div>
            </div>
            <div class="responses-list">
                <div class="responses-inner">
                    <div v-if="loading">
                        <img src="@/assets/images/loading.svg" alt="loading">
                    </div>
                    <dynamic-marquee v-else :reverse="true" :speed="scrollSpeed" :hoverPause="false" :pause="pause">
                        <template v-for="(response, key) in responses">
                            <div class="single-response" :key="key">{{response.response}}
                                <span class="response-dash">&mdash;</span>
                                <span class="response-owner">{{response.name | capitalize}}, {{response.city |capitalize}}</span>
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
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import DynamicMarquee from "vue-dynamic-marquee";
import axios from "axios";
export default {
  components: {
    AppHeader,
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
    if (this.responses.length === 0) this.loadResponses();
  },
  computed: {
    scrollSpeed() {
      return {
        type: "duration",
        number: 45000,
      };
    },
    responsesCount() {
      return this.responses.length.toLocaleString();
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
        .get("https://surviving-2020.herokuapp.com/")
        .then(res => {
          this.loading = false;
          this.responses = res.data.data.reverse();
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
        });
    },
  },
};
</script>
