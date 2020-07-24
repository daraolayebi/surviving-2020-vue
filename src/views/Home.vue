<template>
    <div class="home">
        <div class="home-inner">
            <transition name="slide-fade">
                <image-slideshow v-if="showSlideshow" />
            </transition>

            <transition name="slide-fade">
                <h1 class="home-intro" v-if="showIntro">
                    <vue-typed-js :type-speed="38" :start-delay="2000" :showCursor="false" :strings="['Take a moment to share your 2020 experience and discover what the rest of the world is going through ...']">
                        <span class="animated-text typing" data-title="Take a moment to share your 2020 experiences and discover what the rest of the world is going through ..."></span>
                    </vue-typed-js>
                </h1>
            </transition>

            <transition name="fade">
                <home-menu v-if="showMenu" @show-about="showAbout = true" />
            </transition>
        </div>
    </div>
</template>

<script>
import About from "./About";
import ImageSlideshow from "../components/ImageSlideshow";
import HomeMenu from "../components/HomeMenu";
import { VueTypedJs } from "vue-typed-js";
export default {
  data() {
    return {
      showSlideshow: false,
      showIntro: false,
      showMenu: false,
      showAbout: false,
      pageLoading: false,
    };
  },
  components: {
    About,
    ImageSlideshow,
    HomeMenu,
    VueTypedJs,
  },
  created() {
    this.showSlideshow = false;
    if (document.readyState == "complete") {
      this.showSlideshow = true;
      this.homeSequence();
    }
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.showSlideshow = true;
        this.homeSequence();
      }
    };
  },
  methods: {
    homeSequence() {
      setTimeout(() => {
        this.showSlideshow = false;
        this.showIntro = true;
        let home = document.querySelector(".home");
        home.classList.add("no-divider");
      }, 10000);
      setTimeout(() => {
        this.showMenu = true;
      }, 12000);
    },
  },
  destroyed() {
    let home = document.querySelector(".home");
    home.classList.add("no-divider");
  },
};
</script>



