<template>
    <div>
        <div id="about" class="about">
            <app-header />
            <div class="about-inner">
                <transition name="slide-fade">
                    <div class="slideshow" v-if="slideshow">
                        <slide-show />
                    </div>
                </transition>

                <transition name="slide-fade">
                    <div v-if="showIntro">
                        <h1>
                            <vue-typed-js :type-speed="38" :start-delay="2000" :showCursor="false" :strings="['Take a moment to share your 2020 experience and discover what the rest of the world is going through ...']">
                                <span class="animated-text typing" data-title="Take a moment to share your 2020 experiences and discover what the rest of the world is going through ..."></span>
                            </vue-typed-js>
                        </h1>
                    </div>
                </transition>
                <transition name="fade">
                    <app-footer v-if="showMenus" @show-about="showAbout = true" />
                </transition>

            </div>
        </div>
    </div>
</template>

<script>
import { VueTypedJs } from "vue-typed-js";
import SlideShow from "./SlideShow";
import UserForm from "./Form";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
export default {
  data() {
    return {
      slideshow: false,
      showIntro: false,
      showMenus: false,
      showAbout: false,
      pageLoading: false,
    };
  },
  components: {
    SlideShow,
    UserForm,
    AppHeader,
    AppFooter,
    VueTypedJs,
  },
  created() {
    this.slideshow = false;
    if (document.readyState == "complete") {
      this.slideshow = true;
      this.homeSequence();
    }
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.slideshow = true;
        this.homeSequence();
      }
    };
  },
  methods: {
    homeSequence() {
      setTimeout(() => {
        this.slideshow = false;
        this.showIntro = true;
        let about = document.querySelector(".about");
        about.classList.add("full");
      }, 10000);
      setTimeout(() => {
        this.showMenus = true;
      }, 13000);
    },
  },
  destroyed() {
    let about = document.querySelector(".about");
    about.classList.remove("full");
  },
};
</script>



