<template>
    <div id="responses" class="responses">
        <app-header :pause="pause" @toggle-pause="togglePause" />
        <!-- <div class="responses-bg"></div> -->
        <div class="responses-list">
            <div class="responses-inner">
                <div v-if="loading" class="submit-loading">
                    <img src="@/assets/images/loader.svg" alt="loading" width="26px">
                </div>
                <template v-else>
                    <template v-if="windowWidth <= 1024" v-for="(response, key) in responses">
                        <div class="single-response" :key="key">{{response.response}}
                            <!-- <span class="response-dash">&mdash;</span> -->
                            <span class="response-owner">&mdash; {{response.name | capitalize}}, {{response.city | capitalize}}</span>
                        </div>
                    </template>
                    <dynamic-marquee v-if="windowWidth > 1024" :reverse="true" direction="column" :speed="scrollSpeed" :hoverPause="false" :pause="pause">
                        <template v-for="(response, key) in responses">
                            <div class="single-response" :key="key">{{response.response}}
                                <!-- <span class="response-dash">&mdash;</span> -->
                                <span class="response-owner">&mdash; {{response.name | capitalize}}, {{response.city | capitalize}}</span>
                            </div>
                        </template>
                    </dynamic-marquee>
                </template>
            </div>
            <div class="responses-toggle">
                <button @click="togglePause">
                    <img src="@/assets/images/play.svg" alt="play" v-if="pause" title="pause" />
                    <img src="@/assets/images/pause.svg" alt="pause" v-if="!pause" title="play" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { VueTypedJs } from "vue-typed-js";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import DynamicMarquee from "vue-dynamic-marquee";
import axios from "axios";
export default {
  components: {
    VueTypedJs,
    AppHeader,
    AppFooter,
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
      return { type: "duration", number: 70000 };
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
